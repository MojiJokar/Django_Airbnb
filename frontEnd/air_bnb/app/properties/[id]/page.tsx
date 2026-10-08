import Image from "next/image";
import Link from "next/link";

import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const PropertyDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    // Get the property ID from the URL
    const { id } = await params;

    console.log("PROPERTY ID:", id);

    // Get the property from Django
    const property = await apiService.get(
        `/api/properties/${id}`
    );

    console.log("PROPERTY:", property);
    console.log("PROPERTY ID FROM API:", property.id);

    // Get logged-in user
    const userId = await getUserId();

    console.log("USER ID:", userId);

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">

            {/* Property image */}
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src={property.image_url}
                    className="object-cover w-full h-full"
                    alt={property.title || "Property"}
                />
            </div>

            {/* Property content */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                {/* Property information */}
                <div className="py-6 pr-6 col-span-3">

                    <h1 className="mb-4 text-4xl">
                        {property.title}
                    </h1>

                    <span className="mb-6 block text-lg text-gray-600">
                        {property.guests} guests -{" "}
                        {property.bedrooms} bedrooms -{" "}
                        {property.bathrooms} bathrooms
                    </span>

                    <hr />

                    {/* Landlord */}
                    {/* <Link
                        href={`/landlords/${property.landlord.id}`}
                        className="py-6 flex items-center space-x-4"
                    >
                        {property.landlord.avatar_url && (
                            <Image
                                src={property.landlord.avatar_url}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt={property.landlord.name || "Host"}
                            />
                        )}

                        <p>
                            <strong>
                                {property.landlord.name}
                            </strong>{" "}
                            is your host
                        </p>
                    </Link> */}
                    {/* Landlord */}
                    {property.landlord && (
                        <>
                            <Link
                                href={`/landlords/${property.landlord.id}`}
                                className="py-6 flex items-center space-x-4"
                            >
                                {property.landlord.avatar_url && (
                                    <Image
                                        src={property.landlord.avatar_url}
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                        alt={property.landlord.name || "Host"}
                                    />
                                )}

                                <p>
                                    <strong>
                                        {property.landlord.name}
                                    </strong>{" "}
                                    is your host
                                </p>
                            </Link>

                            <hr />
                        </>
                    )}

                    <hr />

                    {/* Description */}
                    <p className="mt-6 text-lg">
                        {property.description}
                    </p>
                </div>

                {/* Reservation */}
                <ReservationSidebar
                    property={property}
                    userId={userId}
                />

            </div>
        </main>
    );
};

export default PropertyDetailPage;