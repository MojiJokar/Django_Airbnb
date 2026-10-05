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
















// import PropertyListItem from "./PropertyListItem";


// const PropertyList  = () => {
//     return (
        
//          <PropertyListItem/>

       
    
//     )
// }

// export default PropertyList;

//--------------------------------------------------------------
//2.this works:
// 'use client';

// import { useEffect, useState } from 'react';
// import PropertyListItem from "./PropertyListItem";

// export type PropertyType = {
//     id: string;
//     title: string
//     price_per_night: number
//     image_url: string;
//     is_favorite: boolean;
// };

// const PropertyList = () => {
//     const [properties, setProperties] = useState<PropertyType[]>([]);

//     const getProperties = async () => {
//         const url = 'http://localhost:8000/api/properties/';

//         try {
//             const response = await fetch(url);

//             if (!response.ok) {
//                  throw new Error('Failed to fetch properties');
//             }

//             const json = await response.json();

//             console.log('json:', json);

//             setProperties(json.data);
//         } catch (error) {
//             console.log('error:', error);
//         }
//     };

//     useEffect(() => {
//         getProperties();
//     }, []);

//     return (
//         // <div>
//         //     {properties.map((property) => (
//         //         <PropertyListItem
//         //             key={property.id}
//         //             property={property}
//         //         />
//         //     ))}
//         // </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {properties.map((property) => (
//             <PropertyListItem
//                 key={property.id}
//                 property={property}
//             />
//         ))}
//     </div>
//     );
// };

// export default PropertyList;


//-------------works and its ok code following------------------------------
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import PropertyListItem from './PropertyListItem';
// import apiService from '@/app/services/apiService';
// import useSearchModal from '@/app/hooks/useSearchModal';

// export type PropertyType = {
//     id: string;
//     title: string;
//     image_url: string;
//     price_per_night: number;
//     is_favorite: boolean;
// };

// interface PropertyListProps {
//     landlord_id?: string | null;
//     favorites?: boolean | null;
// }

// const PropertyList: React.FC<PropertyListProps> = ({
//     landlord_id,
//     favorites,
// }) => {
//     const params = useSearchParams();
//     const searchModal = useSearchModal();

//     const country = searchModal.query.country;
//     const numGuests = searchModal.query.guests;
//     const numBathrooms = searchModal.query.bathrooms;
//     const numBedrooms = searchModal.query.bedrooms;
//     const category = searchModal.query.category;

//     const [properties, setProperties] = useState<PropertyType[]>([]);

//     console.log('searchQuery:', searchModal.query);

//     const markFavorite = (id: string, is_favorite: boolean) => {
//         const updatedProperties = properties.map(
//             (property: PropertyType) => {
//                 if (property.id === id) {
//                     return {
//                         ...property,
//                         is_favorite,
//                     };
//                 }

//                 return property;
//             }
//         );

//         setProperties(updatedProperties);
//     };

//     const getProperties = async () => {
//         try {
//             let url = '/api/properties/';

//             if (landlord_id) {
//                 url += '?landlord_id=' + landlord_id;
//             } else if (favorites) {
//                 url += '?is_favorites=true';
//             } else {
//                 let urlQuery = '';

//                 if (country) {
//                     urlQuery += '&country=' + country;
//                 }

//                 if (numGuests) {
//                     urlQuery += '&numGuests=' + numGuests;
//                 }

//                 if (numBedrooms) {
//                     urlQuery += '&numBedrooms=' + numBedrooms;
//                 }

//                 if (numBathrooms) {
//                     urlQuery += '&numBathrooms=' + numBathrooms;
//                 }

//                 if (category) {
//                     urlQuery += '&category=' + category;
//                 }

//                 if (urlQuery.length > 0) {
//                     urlQuery = '?' + urlQuery.substring(1);
//                     url += urlQuery;
//                 }
//             }

//             console.log('Request URL:', url);

//             const tmpProperties = await apiService.get(url);

//             console.log('Properties API response:', tmpProperties);

//             const propertyData = Array.isArray(tmpProperties?.data)
//                 ? tmpProperties.data
//                 : [];

//             const favoriteIds = Array.isArray(tmpProperties?.favorites)
//                 ? tmpProperties.favorites
//                 : [];

//             const updatedProperties = propertyData.map(
//                 (property: PropertyType) => ({
//                     ...property,
//                     is_favorite: favoriteIds.includes(property.id),
//                 })
//             );

//             setProperties(updatedProperties);
//         } catch (error) {
//             console.error('getProperties error:', error);
//             setProperties([]);
//         }
//     };

//     useEffect(() => {
//         getProperties();
//     }, [
//         category,
//         country,
//         numGuests,
//         numBedrooms,
//         numBathrooms,
//         params,
//         landlord_id,
//         favorites,
//     ]);

//     return (
//         <>
//             {properties.map((property) => (
//                 <PropertyListItem
//                     key={property.id}
//                     property={property}
//                     markFavorite={(is_favorite: boolean) =>
//                         markFavorite(property.id, is_favorite)
//                     }
//                 />
//             ))}
//         </>
//     );
// };

// export default PropertyList;