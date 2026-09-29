// const Navbar =  () => {


//     return (
//         <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
//             Test
//         </nav>
//     )
// }

// export default Navbar;
//---------------------------------------
// import Image  from "next/image";
// import Link  from "next/link";
// import SearchFilters from "./searchFilter";


// const Navbar =  () => {


//     return (
//         <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
//             <div className="max-w-[1500px] mx-auto px-6">
//                 <div className="flex justify-between items-center">
//                     <Link href="/">
//                         <Image
//                             src="/next.svg"
//                             alt="DjangoBnb logo"
//                             width={180}
//                             height={20}
//                         />
//                     </Link>
//                     <div className="flex space-x-6">
                        
//                         <SearchFilters/>
                        
//                     </div>
//                     <div className="flex items-center space-x-6">
//                         {/* add text for test   add property*/}
//                         add property 
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }

// export default Navbar;
//-------------------------------------------

// import Image  from "next/image";
// import Link  from "next/link";
// import AddPropertyButton from "./AddPropertyButton";
// import UserNav from "./UserNav";
// import SearchFilters from "./searchFilters";
// // searchFilter :
// const Navbar =  () => {


//     return (
//             <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
//                 <div className="max-w-[1500px] mx-auto px-6">
//                     <div className="flex justify-between items-center">
//                         <Link href="/">
//                             <Image
//                                 src="/next.svg"
//                                 alt="DjangoBnb logo"
//                                 width={180}
//                                 height={20}
//                             />
//                         </Link>
//                         <div className="flex space-x-6">
                            
//                             {/* search part test */}
//                             <SearchFilters/>
                            
                            
//                         </div>
//                         <div className="flex items-center space-x-6">
//                             {/* add text for test   add property*/}
//                                Your Home
//                             <UserNav/>
                            
//                         </div>
//                         <div className="flex items-center space-x-6">
//                             {/* add text for test   add property*/}
//                             <AddPropertyButton/>
                           
//                         </div>

//                     </div>
//                 </div>
//             </nav>
//     )
// }

// export default Navbar;


import Image from "next/image";
import Link from "next/link";

import AddPropertyButton from "./AddPropertyButton";
import UserNav from "./UserNav";
import SearchFilters from "./searchFilters";

import { getUserId } from "@/app/lib/actions";

const Navbar = async () => {
    const userId = await getUserId();

    return (
        <nav className="fixed left-0 top-0 z-10 w-full border-b bg-white py-6">
            <div className="mx-auto max-w-[1500px] px-6">
                <div className="flex items-center justify-between">

                    <Link href="/">
                        <Image
                            src="/next.svg"
                            alt="DjangoBnb logo"
                            width={180}
                            height={20}
                        />
                    </Link>

                    <div className="flex space-x-6">
                        <SearchFilters />
                    </div>

                    <div className="flex items-center space-x-6">
                        <AddPropertyButton />

                        <UserNav userId={userId} />
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
