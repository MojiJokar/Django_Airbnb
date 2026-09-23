//final for pplistitem:




import Image from 'next/image';
import { PropertyType } from './types';

type PropertyListItemProps = {
    property: PropertyType;
};

const PropertyListItem = ({ property }: PropertyListItemProps) => {
    return (
        <div className="cursor-pointer">
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src="/Beach_1.jpg"
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover transition hover:scale-110"
                    alt="Beach house"
                />
            </div>

            <div className="mt-2">
                <p className="text-lg font-bold">
                    Property {property.id}
                </p>
            </div>

            <div className="mt-2">
                <p className="text-sm text-gray-700">
                    Price: $110
                </p>
            </div>
        </div>
    );
};

export default PropertyListItem;



// const PropertyListItem  = () => {
//     return (
//         <p>this is propertlisItem </p>
        
    
//     )
// }

// export default PropertyListItem;



// import Image from "next/image";

//--------------------------------------------------------------------
// const PropertyListItem  = () => {
//     return (
//                 < div  className="cursor-pointer">
//                     <div className="  relative overflow-hidden aspect-square rounded-xl">

//                     </div>
//                     <div className="mt-2">
//                         <p className="text-lg font-bold">property listss item name</p>
//                     </div>
//                     <div className="mt-2">
//                         <p className="text-sm text-gray-7500">price : 110 $</p>
//                     </div>

                    

//                 </div>
    
//     )
// }

// export default PropertyListItem;
//=A============================
// import Image from "next/image";


// const PropertyListItem  = () => {
//     return (
//                 < div  className="cursor-pointer">
//                     <div className="  relative overflow-hidden aspect-square rounded-xl">
//                         <Image
//                                 fill
//                                 src='/icn_category_beach.jpeg'
//                                 sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
//                                 className="hover:scale-110 object-cover transition h-full w-full"
//                                 alt="Beach house"
//                         />
//                         <Image
//                                 fill
//                                 src='/Beach_1.jpg'
//                                 sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
//                                 className="hover:scale-110 object-cover transition h-full w-full"
//                                 alt="Beach house"
//                         />
//                         <Image
//                                 fill
//                                 src='/icn_category_beach.jpeg'
//                                 sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
//                                 className="hover:scale-110 object-cover transition h-full w-full"
//                                 alt="Beach house"
//                         />
//                         <Image
//                                 fill
//                                 src='/icn_category_beach.jpeg'
//                                 sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
//                                 className="hover:scale-110 object-cover transition h-full w-full"
//                                 alt="Beach house"
//                         />

//                     </div>
//                     <div className="mt-2">
//                         <p className="text-lg font-bold">property name</p>
//                     </div>
//                     <div className="mt-2">
//                         <p className="text-sm text-gray-7500">price : 2000 $</p>
//                     </div>
//                  </div>
    
//     )
// }

// export default PropertyListItem;








//3==match it with peropertylist====================================================================================

// import Image from 'next/image';

// import { PropertyType } from './PropertyList';

// type PropertyListItemProps = {
//     property: PropertyType;
// };

// const PropertyListItem = ({ property }: PropertyListItemProps) => {
//     return (
//         <div className="cursor-pointer">
//             <div className="relative overflow-hidden aspect-square rounded-xl">
//                 <Image
//                     fill
//                     src="/icn_category_beach.jpeg"
//                     sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
//                     className="hover:scale-110 object-cover transition h-full w-full"
//                     alt="Beach house"
//                 />
//             </div>

//             <div className="mt-2">
//                 <p className="text-lg font-bold">
//                     Property {property.id}
//                 </p>
//             </div>

//             <div className="mt-2">
//                 <p className="text-sm text-gray-700">
//                     Price: $110
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default PropertyListItem;

















//----------------------------------------------------


// import Image from 'next/image';

// import { PropertyType } from './PropertyList';

// type PropertyListItemProps = {
//     property: PropertyType;
// };

// const PropertyListItem = ({ property }: PropertyListItemProps) => {
//     return (
//         <div className="cursor-pointer">
//             <div className="relative overflow-hidden aspect-square rounded-xl">
//                 <Image
//                     fill
//                     src="/Beach_1.jpg"
//                     sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
//                     className="hover:scale-110 object-cover transition h-full w-full"
//                     alt="Beach house"
//                 />
//             </div>

//             <div className="mt-2">
//                 <p className="text-lg font-bold">
//                     Property {property.id}
//                 </p>
//             </div>

//             <div className="mt-2">
//                 <p className="text-sm text-gray-700">
//                     Price: $110
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default PropertyListItem;

//---------------------------------------------------------

// import Image from 'next/image';
// import { PropertyType } from './types';

// type PropertyListItemProps = {
//     property: PropertyType;
// };

// const PropertyListItem = ({ property }: PropertyListItemProps) => {
//     return (
//         <div className="cursor-pointer">
//             <div className="relative overflow-hidden aspect-square rounded-xl">
//                 <Image
//                     fill
//                     src="/Beach_1.jpg"
//                     sizes="(max-width: 768px) 100vw, 768px"
//                     className="object-cover transition hover:scale-110"
//                     alt="Beach house"
//                 />
//             </div>

//             <div className="mt-2">
//                 <p className="text-lg font-bold">
//                     Property {property.id}
//                 </p>
//             </div>

//             <div className="mt-2">
//                 <p className="text-sm text-gray-700">
//                     Price: $110
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default PropertyListItem;


// import Image from 'next/image';
// import React from 'react';
// import { PropertyType } from './PropertiyList';

// interface PropertyProps {
//     property: PropertyType;
// }

// const PropertyListItem: React.FC<PropertyProps> = ({ property }) => {
//     return (
//         <div className="cursor-pointer">
//             <div className="relative overflow-hidden aspect-square rounded-xl">
//                 <Image
//                     fill
//                     unoptimized
//                     src={property.image_url}
//                     sizes="(max-width: 768px) 100vw, 768px"
//                     className="object-cover transition hover:scale-110"
//                     alt={property.title}
//                 />
//             </div>

//             <div className="mt-2">
//                 <p className="text-lg font-bold">
//                     {property.title}
//                 </p>
//             </div>

//             <div className="mt-2">
//                 <p className="text-sm text-gray-700">
//                     ${property.price_per_night} / night
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default PropertyListItem;































// import Image from "next/image";

// const PropertyListItem = () => {
//   return (
//     <div className="cursor-pointer">
//       <div className="relative aspect-square overflow-hidden rounded-xl">
//         <Image
//           fill
//           src="/Beach_1.jpg"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
//           className="object-cover transition duration-300 hover:scale-110"
//           alt="Beach house"
//         />
//       </div>

//       <div className="mt-2">
//         <p className="text-lg font-bold">Beach House</p>
//       </div>

//       <div className="mt-1">
//         <p className="text-sm text-gray-700">Beautiful beach property</p>
//       </div>
//     </div>
//   );
// };

// export default PropertyListItem;




















 









// import Image from "next/image";
// import { PropertyType } from "./PropertyList";
// import { useRouter } from "next/navigation";
// import FavoriteButton from "../FavoriteButton";

// interface PropertyProps {
//     property: PropertyType,
//     markFavorite?: (is_favorite: boolean) => void;
// }

// const PropertyListItem: React.FC<PropertyProps> = ({
//     property,
//     markFavorite
// }) => {
//     const router = useRouter();

//     return (
//         <div 
//             className="cursor-pointer"
//             onClick={() => router.push(`/properties/${property.id}`)}
//         >
//             <div className="relative overflow-hidden aspect-square rounded-xl">
//                 <Image
//                     fill
//                     src={property.image_url}
//                     sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
//                     className="hover:scale-110 object-cover transition h-full w-full"
//                     alt="Beach house"
//                 />

//                 {markFavorite && (
//                     <FavoriteButton
//                         id={property.id}
//                         is_favorite={property.is_favorite}
//                         markFavorite={(is_favorite) => markFavorite(is_favorite)}
//                     />
//                 )}
//             </div>

//             <div className="mt-2">
//                 <p className="text-lg font-bold">{property.title}</p>
//             </div>

//             <div className="mt-2">
//                 <p className="text-sm text-gray-500"><strong>${property.price_per_night}</strong> per night</p>
//             </div>
//         </div>
//     )
// }

// export default PropertyListItem;