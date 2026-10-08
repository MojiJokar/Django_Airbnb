'use server';

import apiService from '@/app/services/apiService';

export async function getPropertyReservations(propertyId: string) {
    return await apiService.get(
        `/api/properties/${propertyId}/reservations/`
    );
}

export async function bookProperty(
    propertyId: string,
    data: {
        guests: string;
        start_date: string;
        end_date: string;
        number_of_nights: number;
        total_price: number;
    }
) {
    return await apiService.post(
        `/api/properties/${propertyId}/book/`,
        data
    );
}