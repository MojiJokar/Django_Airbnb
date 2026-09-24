//------test 1
// const PropertyListItem  = () => {
//     return (
//         <p>pdhfkasdfhsa </p>
    
//     )
// }

// export default PropertyListItem;


//------tesst 2-------------------------------------------


// import Image from "next/image";


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
//                  </div>
    
//     )
// }

// export default PropertyListItem;

//----one property under it with a text------test 3-----------------------------
import Image from "next/image";


const PropertyListItem  = () => {
    return (
                < div  className="cursor-pointer">
                    <div className="  relative overflow-hidden aspect-square rounded-xl">
                        <Image
                                fill
                                src='/Beach_1.jpg'
                                sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                                className="hover:scale-110 object-cover transition h-full w-full"
                                alt="Beach house"
                        />

                    </div>
                    <div className="mt-2">
                        <p className="text-lg font-bold">property name</p>
                    </div>
                    <div className="mt-2">
                        <p className="text-sm text-gray-7500">price : 110 $</p>
                    </div>
                 </div>
    
    )
}

export default PropertyListItem;
//---------------------------------to have 3 property "foto" and text you must change propertylistand 
// add three times <PropertyListItem />















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