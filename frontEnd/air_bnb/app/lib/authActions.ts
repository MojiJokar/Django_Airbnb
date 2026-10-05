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
// "use server";

// import apiService from "../services/apiService";

// export async function signupUser(data: any) {
//     try {
//         const response = await apiService.postWithoutToken(
//             "/api/auth/register/",
//             data
//         );

//         return {
//             success: true,
//             data: response,
//         };
//     } catch (error) {
//         console.error("Signup error:", error);

//         return {
//             success: false,
//             error: "Signup failed",
//         };
//     }
// }

// export async function loginUser(data: any) {
//     try {
//         const response = await apiService.postWithoutToken(
//             "/api/auth/login/",
//             data
//         );

//         return {
//             success: true,
//             data: response,
//         };
//     } catch (error) {
//         console.error("Login error:", error);

//         return {
//             success: false,
//             error: "Login failed",
//         };
//     }
// }

"use server";

import apiService from "../services/apiService";
import { handleLogin } from "./actions";

// export async function signupUser(data: any) {
//     try {
//         const response = await apiService.postWithoutToken(
//             "/api/auth/register/",
//             data
//         );

//         return {
//             success: true,
//             data: response,
//         };
//     } catch (error) {
//         console.error("Signup error:", error);

//         return {
//             success: false,
//             error: "Signup failed",
//         };
//     }
// }
export async function signupUser(data: any) {
    try {
        const response = await apiService.postWithoutToken(
            "/api/auth/register/",
            data
        );

        console.log("SIGNUP API RESPONSE:", response);

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

        console.log("LOGIN API RESPONSE:", response);

        // await handleLogin(
        //     response.user.id,
        //     response.access,
        //     response.refresh
        // );
        await handleLogin(
            response.user.pk,
            response.access,
            response.refresh
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