
// const AddPropertyButton = () => {

//     return (
//         <p>addButtonsss</p>

//     )
// }

// export default AddPropertyButton;
//===================================================
// const AddPropertyButton = () => {

//     return (
//             <div className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200">
//                     Navbar,AddPropertyButton.tsx
//             </div>

//     )
// }

// export default AddPropertyButton;
//-------------------------------TEST----------------

'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";

interface AddPropertyButtonProps {
    userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
    userId
}) => {
    const loginModal = useLoginModal();
    const addPropertyModal = useAddPropertyModal();

    const airbnbYourHome = () => {

        console.log("BEFORE:", useAddPropertyModal.getState().isOpen);

        addPropertyModal.open();
    
        console.log("AFTER:", useAddPropertyModal.getState().isOpen);
    }

    return (
        <div 
            onClick={airbnbYourHome}
            className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
        >
            Djangobnb your home
        </div>
    )
}

export default AddPropertyButton;

// real code following:
// 'use client';

// import useLoginModal from "@/app/hooks/useLoginModal";
// import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";

// interface AddPropertyButtonProps {
//     userId?: string | null;
// }

// const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
//     userId
// }) => {
//     const loginModal = useLoginModal();
//     const addPropertyModal = useAddPropertyModal();

//     const airbnbYourHome = () => {
//         if (userId) {
//             addPropertyModal.open()
//         } else {
//             loginModal.open();
//         }
//     }

//     return (
//         <div 
//             onClick={airbnbYourHome}
//             className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
//         >
//             Djangobnb your home
//         </div>
//     )
// }

// export default AddPropertyButton;


