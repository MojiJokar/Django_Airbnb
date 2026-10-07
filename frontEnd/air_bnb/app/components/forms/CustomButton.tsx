
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
