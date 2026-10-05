
import Image from "next/image";
import apiService from "@/app/services/apiService";
// import getUserId from "@/app/services/getUserId";

const PropertyDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const property = await apiService.get(
        `/api/properties/${id}/`
    );

    // const userId = await getUserId();

    // console.log("userId:", userId);
    console.log("property:", property);
    console.log("image:", property.image_url);

    return (
        <main className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                {property.title}
            </h1>

            <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
                <Image
                    src={property.image_url}
                    fill
                    className="object-cover"
                    alt={property.title}
                    sizes="(max-width: 768px) 100vw, 1200px"
                />
            </div>

            <div className="mt-6">
                <p className="text-xl font-bold">
                    €{property.price_per_night} per night
                </p>

                <p className="mt-2">
                    Property ID: {property.id}
                </p>
            </div>
        </main>
    );
};

export default PropertyDetailPage;
