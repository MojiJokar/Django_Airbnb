// "use server";

// import apiService from "../services/apiService";

// export async function signupUser(data: any) {
// try {
// const response = await apiService.postWithoutToken(
// "/api/auth/register/",
// data
// );


//     return {
//         success: true,
//         data: response,
//     };
// } catch (error) {
//     console.error("Signup error:", error);

//     return {
//         success: false,
//         error: "Signup failed",
//     };
// }


// }
//------------------for both login and signup-------------------
"use server";

import apiService from "../services/apiService";

export async function signupUser(data: any) {
    try {
        const response = await apiService.postWithoutToken(
            "/api/auth/register/",
            data
        );

        return {
            success: true,
            data: response,
        };
    } catch (error) {
        console.error("Signup error:", error);

        return {
            success: false,
            error: "Signup failed",
        };
    }
}

export async function loginUser(data: any) {
    try {
        const response = await apiService.postWithoutToken(
            "/api/auth/login/",
            data
        );

        return {
            success: true,
            data: response,
        };
    } catch (error) {
        console.error("Login error:", error);

        return {
            success: false,
            error: "Login failed",
        };
    }
}