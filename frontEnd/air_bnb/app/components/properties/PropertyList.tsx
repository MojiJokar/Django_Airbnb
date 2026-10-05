"use client";

import { useEffect, useState } from "react";

import PropertyListItem from "./PropertyListItem";
import useSearchModal from "@/app/hooks/useSearchModal";
import { getProperties } from "@/app/lib/propertyActions";

export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
    is_favorite: boolean;
};

interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}

const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id,
    favorites,
}) => {
    const searchModal = useSearchModal();

    const country = searchModal.query.country;
    const numGuests = searchModal.query.guests;
    const numBathrooms = searchModal.query.bathrooms;
    const numBedrooms = searchModal.query.bedrooms;
    const category = searchModal.query.category;

    const [properties, setProperties] = useState<PropertyType[]>([]);

    const markFavorite = (
        id: string,
        is_favorite: boolean
    ) => {
        setProperties((currentProperties) =>
            currentProperties.map((property) =>
                property.id === id
                    ? {
                          ...property,
                          is_favorite,
                      }
                    : property
            )
        );
    };

    const fetchProperties = async () => {
        try {
            let url = "/api/properties/";

            if (landlord_id) {
                url += "?landlord_id=" + landlord_id;
            } else if (favorites) {
                url += "?is_favorites=true";
            } else {
                let urlQuery = "";

                if (country) {
                    urlQuery += "&country=" + country;
                }

                if (numGuests) {
                    urlQuery += "&numGuests=" + numGuests;
                }

                if (numBedrooms) {
                    urlQuery += "&numBedrooms=" + numBedrooms;
                }

                if (numBathrooms) {
                    urlQuery += "&numBathrooms=" + numBathrooms;
                }

                if (category) {
                    urlQuery += "&category=" + category;
                }

                if (urlQuery.length > 0) {
                    urlQuery = "?" + urlQuery.substring(1);
                    url += urlQuery;
                }
            }

            console.log("Request URL:", url);

            const tmpProperties = await getProperties(url);

            console.log(
                "Properties loaded:",
                Array.isArray(tmpProperties?.data)
                    ? tmpProperties.data.length
                    : 0
            );

            const propertyData = Array.isArray(tmpProperties?.data)
                ? tmpProperties.data
                : [];

            const favoriteIds = Array.isArray(
                tmpProperties?.favorites
            )
                ? tmpProperties.favorites
                : [];

            const updatedProperties = propertyData.map(
                (property: PropertyType) => ({
                    ...property,
                    is_favorite: favoriteIds.includes(property.id),
                })
            );

            setProperties(updatedProperties);
        } catch (error) {
            console.error("getProperties error:", error);
            setProperties([]);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, [
        category,
        country,
        numGuests,
        numBedrooms,
        numBathrooms,
        landlord_id,
        favorites,
    ]);

    return (
        <>
            {properties.map((property) => (
                <PropertyListItem
                    key={property.id}
                    property={property}
                    markFavorite={(is_favorite: boolean) =>
                        markFavorite(
                            property.id,
                            is_favorite
                        )
                    }
                />
            ))}
        </>
    );
};

export default PropertyList;