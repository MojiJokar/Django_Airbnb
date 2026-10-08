
import "server-only";

import {
    getAccessToken,
    handleRefresh,
} from "../lib/actions";

const API_HOST = process.env.API_HOST;

if (!API_HOST) {
    throw new Error("API_HOST is not configured");
}

const apiService = {
    async get(url: string) {
        let accessToken = await getAccessToken();

        console.log("🔥 ACCESS TOKEN EXISTS:", !!accessToken);

        const makeRequest = async (token?: string) => {
            return fetch(`${API_HOST}${url}`, {
                method: "GET",
                headers: {
                    ...(token
                        ? {
                              Authorization: `Bearer ${token}`,
                          }
                        : {}),
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });
        };

        let response = await makeRequest(
            accessToken || undefined
        );

        // Access token expired
        if (response.status === 401 && accessToken) {
            console.log(
                "🔄 Access token expired. Refreshing..."
            );

            accessToken = await handleRefresh();

            if (!accessToken) {
                throw new Error(
                    "Could not refresh access token"
                );
            }

            response = await makeRequest(accessToken);
        }

        const responseText = await response.text();

        console.log(
            "GET API STATUS:",
            response.status
        );

        console.log(
            "GET API URL:",
            `${API_HOST}${url}`
        );

        console.log(
            "GET API RESPONSE:",
            responseText
        );

        if (!response.ok) {
            throw new Error(
                `API error: ${response.status} - ${responseText}`
            );
        }

        return responseText
            ? JSON.parse(responseText)
            : {};
    },

    async postWithoutToken(
        url: string,
        data: unknown
    ) {
        const isFormData = data instanceof FormData;

        const response = await fetch(
            `${API_HOST}${url}`,
            {
                method: "POST",
                headers: {
                    ...(isFormData
                        ? {}
                        : {
                              "Content-Type":
                                  "application/json",
                          }),
                },
                body: isFormData
                    ? data
                    : JSON.stringify(data),
                cache: "no-store",
            }
        );

        const responseText = await response.text();

        console.log(
            "PUBLIC API STATUS:",
            response.status
        );

        console.log(
            "PUBLIC API RESPONSE:",
            responseText
        );

        if (!response.ok) {
            throw new Error(
                `API error: ${response.status} - ${responseText}`
            );
        }

        return responseText
            ? JSON.parse(responseText)
            : {};
    },

    async post(
        url: string,
        data: unknown
    ) {
        let accessToken = await getAccessToken();

        console.log(
            "🔥 POST ACCESS TOKEN EXISTS:",
            !!accessToken
        );

        if (!accessToken) {
            throw new Error(
                "No access token available"
            );
        }

        const isFormData =
            data instanceof FormData;

        const makeRequest = async (
            token: string
        ) => {
            return fetch(
                `${API_HOST}${url}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ...(isFormData
                            ? {}
                            : {
                                  "Content-Type":
                                      "application/json",
                              }),
                    },
                    body: isFormData
                        ? data
                        : JSON.stringify(data),
                    cache: "no-store",
                }
            );
        };

        let response =
            await makeRequest(accessToken);

        // Access token expired
        if (response.status === 401) {
            console.log(
                "🔄 Access token expired. Refreshing..."
            );

            accessToken = await handleRefresh();

            if (!accessToken) {
                throw new Error(
                    "Could not refresh access token"
                );
            }

            response =
                await makeRequest(accessToken);
        }

        const responseText =
            await response.text();

        console.log(
            "POST API STATUS:",
            response.status
        );

        console.log(
            "POST API RESPONSE:",
            responseText
        );

        if (!response.ok) {
            throw new Error(
                `API error: ${response.status} - ${responseText}`
            );
        }

        return responseText
            ? JSON.parse(responseText)
            : {};
    },
};

export default apiService;

