import Image from "next/image";

const Categories = () => {
    return (
        <div className="pt-3 pb-6 flex items-center justify-center gap-16 w-full cursor-pointer">
            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-40 hover:opacity-100">
                <Image
                    src="/icn_category_beach.webp"
                    alt="Category Beach"
                    width={20}
                    height={20}
                />
                <span className="text-xs">Beach</span>
            </div>

            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-40 hover:opacity-100">
                <Image
                    src="/icn_category_beach.webp"
                    alt="Category Villa"
                    width={20}
                    height={20}
                />
                <span className="text-xs">Villa</span>
            </div>

            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-40 hover:opacity-100">
                <Image
                    src="/icn_category_beach.webp"
                    alt="Category Suit"
                    width={20}
                    height={20}
                />
                <span className="text-xs">Suit</span>
            </div>

            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-40 hover:opacity-100">
                <Image
                    src="/icn_category_beach.webp"
                    alt="Category House"
                    width={20}
                    height={20}
                />
                <span className="text-xs">House</span>
            </div>
        </div>
    );
};

export default Categories;
