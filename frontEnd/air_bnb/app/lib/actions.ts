//bridge between the Next.js frontend and the Django backend,
//lib,actions.ts =>centralizing application actions /api logic that communicate with
//  the backend or perform business operations
//server action, Authentication action data validation/transformation

"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "session_access_token";
const REFRESH_TOKEN_COOKIE = "session_refresh_token";
const USER_ID_COOKIE = "session_userid";

export async function handleRefresh() {
console.log("handleRefresh");


const refreshToken = await getRefreshToken();

if (!refreshToken) {
    console.log("No refresh token available");
    return null;
}

try {
    const response = await fetch(
        `${process.env.API_HOST}/api/auth/token/refresh/`,
        {
            method: "POST",
            body: JSON.stringify({
                refresh: refreshToken,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
        const text = await response.text();

        console.error(
            "Refresh token request failed:",
            response.status,
            text
        );

        return null;
    }

    if (!contentType?.includes("application/json")) {
        const text = await response.text();

        console.error(
            "Refresh endpoint returned non-JSON:",
            text
        );

        return null;
    }

    const json = await response.json();

    console.log("Response - Refresh:", json);

    if (!json.access) {
        console.error(
            "No access token returned from refresh endpoint"
        );

        return null;
    }

    const cookieStore = await cookies();

    cookieStore.set(ACCESS_TOKEN_COOKIE, json.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
    });

    return json.access;
} catch (error) {
    console.error("Refresh error:", error);
    return null;
}

}



export async function handleLogin(
    userId: string,
    accessToken: string,
    refreshToken: string
) {
    console.log("HANDLE LOGIN");
    console.log("USER ID:", userId);
    console.log("ACCESS TOKEN EXISTS:", !!accessToken);
    console.log("REFRESH TOKEN EXISTS:", !!refreshToken);

    const cookieStore = await cookies();

    cookieStore.set(USER_ID_COOKIE, userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
    });

    cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    console.log("TOKENS SAVED");
}



export async function resetAuthCookies() {
const cookieStore = await cookies();

cookieStore.set(USER_ID_COOKIE, "", {
    maxAge: 0,
    path: "/",
});

cookieStore.set(ACCESS_TOKEN_COOKIE, "", {
    maxAge: 0,
    path: "/",
});

cookieStore.set(REFRESH_TOKEN_COOKIE, "", {
    maxAge: 0,
    path: "/",
});


}

export async function getUserId() {
const cookieStore = await cookies();


const userId = cookieStore.get(USER_ID_COOKIE)?.value;

return userId || null;


}

export async function getAccessToken() {
const cookieStore = await cookies();


const accessToken =
    cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

if (accessToken) {
    return accessToken;
}

const refreshToken =
    cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

if (!refreshToken) {
    console.log("No access or refresh token available");
    return null;
}

return await handleRefresh();


}

export async function getRefreshToken() {
const cookieStore = await cookies();


const refreshToken =
    cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

return refreshToken || null;


}

