// 'use client';

// interface MenuLinkProps {
//     label: string;
//     onClick: () => void;
// }

// const MenuLink: React.FC<MenuLinkProps> = ({
//     label,
//     onClick
// }) => {
//     return (
//         <div 
//             onClick={onClick}
//             className="px-5 py-4 cursor-pointer hover:bg-gray-100 transition"
//         >
//             {label}
//         </div>
//     )
// }

// export default MenuLink;


//-------------
"use client";

interface MenuLinkProps {
    label: string;
    onClick: () => void;
}

const MenuLink = ({
    label,
    onClick,
}: MenuLinkProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full px-5 py-3 text-left hover:bg-gray-100"
        >
            {label}
        </button>
    );
};

export default MenuLink;