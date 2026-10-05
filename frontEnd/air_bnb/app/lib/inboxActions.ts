"use server";

import apiService from "../services/apiService";

export async function getConversations() {
return await apiService.get("/api/conversations/");
}

export async function createConversation(data: any) {
return await apiService.post(
"/api/conversations/",
data
);
}
