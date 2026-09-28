
"use client";

interface CustomButtonProps {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit";
}

const CustomButton = ({
    label,
    onClick,
    type = "button",
}: CustomButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full h-[54px] bg-black text-white rounded-xl hover:bg-gray-800"
        >
            {label}
        </button>
    );
};

export default CustomButton;








//works well
// interface CustomButtonProps {
//     label: string;
//     className?: string;
//     onClick: () => void;
// }

// const CustomButton: React.FC<CustomButtonProps> = ({
//     label,
//     className,
//     onClick
// }) => {
//     return (
//         <div 
//             onClick={onClick}
//             className={`w-full py-4 bg-airbnb hover:bg-airbnb-dark text-white text-center rounded-xl transition cursor-pointer ${className}`}
//         >
//             {label}
//         </div>
//     )
// }

// export default CustomButton;