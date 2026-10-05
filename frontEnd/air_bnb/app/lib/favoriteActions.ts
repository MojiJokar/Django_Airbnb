"use server";

import apiService from "../services/apiService";

export async function toggleFavoriteAction(id: string) {
    return await apiService.post(
        `/api/properties/${id}/toggle_favorite/`,
        {}
    );
}