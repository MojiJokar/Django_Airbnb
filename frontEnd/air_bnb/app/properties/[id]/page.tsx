

// const PropertyDetailPage = () => {
//         return (
//             <p>this is  property [id]  page.tsx </p>
//         )
//     }
    
//     export default PropertyDetailPage;
    

// export default PropertyDetailPage;

//-------------------------http://localhost:3000/properties/sdfads------------------------------------------------

// import Image from "next/image";

// const PropertyDetailPage = () => {
//     return (
        
//             <main className="max-w-[1500px] mx-auto px-6">
//                 <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
//                         <Image
//                             fill
//                             src='/icn_category_beach.jpeg'
//                             className="object-cover w-full h-full"
//                             alt="Beach house"
//                         />
//                 </div>
//             </main>
       
//     );
// };
  

// export default PropertyDetailPage;



// import Image from "next/image";

// const PropertyDetailPage = () => {
//     return (
//         <main className="max-w-[1500px] mx-auto px-6 pb-6">
//             <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
//                 <Image
//                     fill
//                     src="/icn_category_beach.jpeg"
//                     className="object-cover w-full h-full"
//                     alt="Beach house"
//                 />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                 <div className="py-6 pr-6 col-span-3">
//                     <h1 className="mb-4 text-4xl">Property Name</h1>

//                     <span className="mb-6 block text-lg text-gray-600">
//                         4 guests - 2 bedrooms - 1 bathroom
//                     </span>

//                     <hr />

//                     <div className="py-6 flex items-center space-x-4">
//                         <Image
//                             src="/profile_pic_1.jpg"
//                             width={50}
//                             height={50}
//                             className="rounded-full"
//                             alt="The User Name"
//                         />
//                         <p><strong>John Doe</strong> "Your Host"</p>
//                     </div>
//                     <hr />
//                     <p className="m-6 text-lg">
//                         Loren hi , how are you?
//                         rterterter
//                         ertrettttttttttttttt .
//                     </p>
//                 </div>
//             <div/>

//                 <div>
//                     right
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default PropertyDetailPage;




// with reversesidebar
import Image from "next/image";
import ReservationSidebar from "../ReservationSideBar";
const PropertyDetailPage = () => {
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src="/icn_category_beach.jpeg"
                    className="object-cover w-full h-full"
                    alt="Beach house"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">Property Name</h1>

                    <span className="mb-6 block text-lg text-gray-600">
                        4 guests - 2 bedrooms - 1 bathroom
                    </span>

                    <hr />

                    <div className="py-6 flex items-center space-x-4">
                        <Image
                            src="/profile_pic_1.jpg"
                            width={50}
                            height={50}
                            className="rounded-full"
                            alt="The User Name"
                        />
                        <p><strong>John Doe</strong> "Your Host"</p>
                    </div>
                    <hr />
                    <p className="m-6 text-lg">
                        Loren hi , how are you?
                        rterterter
                        ertrettttttttttttttt .
                    </p>
                </div>
               <ReservationSidebar/>
            


            </div>
        </main>
    );
};

export default PropertyDetailPage;































// if in browser typeL: http://172.30.208.1:3000/properties/1dfsdf
// i see the page property page i wrote above:

// import Image from "next/image";
// import Link from "next/link";
// import ReservationSidebar from "@/app/components/properties/ReservationSidebar";

// import apiService from "@/app/services/apiService";
// import { getUserId } from "@/app/lib/actions";

// const PropertyDetailPage = async ({params}: { params: {id: string }}) => {
//     const property = await apiService.get(`/api/properties/${params.id}`);
//     const userId = await getUserId();

//     console.log('userId', userId);

//     return (
        // <main className="max-w-[1500px] mx-auto px-6 pb-6">
        //     <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
        //         <Image
        //             fill
        //             src={property.image_url}
        //             className="object-cover w-full h-full"
        //             alt="Beach house"
        //         />
        //     </div>

        //     <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        //         <div className="py-6 pr-6 col-span-3">
        //             <h1 className="mb-4 text-4xl">{property.title}</h1>

        //             <span className="mb-6 block text-lg text-gray-600">
        //                 {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathrooms
        //             </span>

        //             <hr />

        //             <Link 
        //                 href={`/landlords/${property.landlord.id}`}
        //                 className="py-6 flex items-center space-x-4"
        //             >
        //                 {property.landlord.avatar_url && (
        //                     <Image
        //                         src={property.landlord.avatar_url}
        //                         width={50}
        //                         height={50}
        //                         className="rounded-full"
        //                         alt="The user name"
        //                     />
        //                 )}

        //                 <p><strong>{property.landlord.name}</strong> is your host</p>
        //             </Link>

            //         <hr />

            //         <p className="mt-6 text-lg">
            //             {property.description}
            //         </p>
            //     </div>

//                 <ReservationSidebar 
//                     property={property}
//                     userId={userId}
//                 />
//             </div>
//         </main>
//     )
// }

// export default PropertyDetailPage;