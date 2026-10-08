
// import Image from "next/image";
// import apiService from "@/app/services/apiService";
// // import getUserId from "@/app/services/getUserId";

// const PropertyDetailPage = async ({
//     params,
// }: {
//     params: Promise<{ id: string }>;
// }) => {
//     const { id } = await params;

//     const property = await apiService.get(
//         `/api/properties/${id}/`
//     );

//     // const userId = await getUserId();

//     // console.log("userId:", userId);
//     console.log("property:", property);
//     console.log("image:", property.image_url);

//     return (
//         <main className="max-w-5xl mx-auto p-6">
//             <h1 className="text-3xl font-bold mb-6">
//                 {property.title}
//             </h1>

//             <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
//                 <Image
//                     src={property.image_url}
//                     fill
//                     className="object-cover"
//                     alt={property.title}
//                     sizes="(max-width: 768px) 100vw, 1200px"
//                 />
//             </div>

//             <div className="mt-6">
//                 <p className="text-xl font-bold">
//                     €{property.price_per_night} per night
//                 </p>

//                 <p className="mt-2">
//                     Property ID: {property.id}
//                 </p>
//             </div>
//         </main>
//     );
// };

// export default PropertyDetailPage;
//-------------------------------------------------------
// import Image from "next/image";
// import Link from "next/link";
// import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
// import getProperty  from "@/app/services/apiService";
// // import apiService from "@/app/services/apiService";

// // import apiService from "@/app/services/apiService";
// import { getUserId } from "@/app/lib/actions";

// const PropertyDetailPage = async ({params}: { params: {id: string }}) => {
//     // const property = await apiService.get(`/api/properties/${params.id}`);
//     const property = await getProperty.get(`/api/properties/${params.id}`);
//     const userId = await getUserId();

//     console.log('userId', userId);

//     return (
//         <main className="max-w-[1500px] mx-auto px-6 pb-6">
//             <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
//                 <Image
//                     fill
//                     src={property.image_url}
//                     className="object-cover w-full h-full"
//                     alt="Beach house"
//                 />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                 <div className="py-6 pr-6 col-span-3">
//                     <h1 className="mb-4 text-4xl">{property.title}</h1>

//                     <span className="mb-6 block text-lg text-gray-600">
//                         {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathrooms
//                     </span>

//                     <hr />

//                     <Link 
//                         href={`/landlords/${property.landlord.id}`}
//                         className="py-6 flex items-center space-x-4"
//                     >
//                         {property.landlord.avatar_url && (
//                             <Image
//                                 src={property.landlord.avatar_url}
//                                 width={50}
//                                 height={50}
//                                 className="rounded-full"
//                                 alt="The user name"
//                             />
//                         )}

//                         <p><strong>{property.landlord.name}</strong> is your host</p>
//                     </Link>

//                     <hr />

//                     <p className="mt-6 text-lg">
//                         {property.description}
//                     </p>
//                 </div>

//                 <ReservationSidebar 
//                     property={property}
//                     userId={userId}
//                 />
//             </div>
//         </main>
//     )
// }

// export default PropertyDetailPage;

//-------------------------

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