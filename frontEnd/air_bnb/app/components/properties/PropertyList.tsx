

// const PropertyList  = () => {
//     return (
//         <p>propertyList :</p>
         

       
    
//     )
// }

// export default PropertyList;


//--------------------------------------------------
import PropertyListItem from "./PropertyListItem";

export default function PropertiesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <PropertyListItem />
      <PropertyListItem />
      <PropertyListItem />
    </div>
  );
}

//3-match it with propertylistItem----------------------------------------
// 'use client';

// import { useEffect, useState } from 'react';
// import PropertyListItem from './PropertyListItem';


// export type PropertyType = {
//     id: string;
//     title: string
//     price_per_night: number
//     image_url: string;
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
//         <div>
//             {properties.map((property) => (
//                 <PropertyListItem
//                     key={property.id}
//                     property={property}
//                 />
//             ))}
//         </div>
//     );
// };

// export default PropertyList;