// "use server";

// import apiService from "../services/apiService";

// export async function getProperties(url: string) {
//     return await apiService.get(url);
// }



"use server";

import apiService from "../services/apiService";

export async function getProperties(url: string) {
    return await apiService.get(url);
}

export async function createProperty(formData: FormData) {
    return await apiService.post(
        "/api/properties/create/",
        formData
    );
}