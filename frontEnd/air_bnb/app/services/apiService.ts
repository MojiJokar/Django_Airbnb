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
        const accessToken = await getAccessToken();

        const response = await fetch(`${API_HOST}${url}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            const responseText = await response.text();

            throw new Error(
                `API error: ${response.status} - ${responseText}`
            );
        }

        return response.json();
    },

    async postWithoutToken(url: string, data: unknown) {
        const isFormData = data instanceof FormData;

        const response = await fetch(`${API_HOST}${url}`, {
            method: "POST",
            headers: {
                ...(isFormData
                    ? {}
                    : {
                          "Content-Type": "application/json",
                      }),
            },
            body: isFormData
                ? data
                : JSON.stringify(data),
            cache: "no-store",
        });

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

    async post(url: string, data: unknown) {
        let accessToken = await getAccessToken();

        if (!accessToken) {
            throw new Error("No access token available");
        }

        const isFormData = data instanceof FormData;

        const makeRequest = async (token: string) => {
            return await fetch(`${API_HOST}${url}`, {
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
            });
        };

        let response = await makeRequest(accessToken);

        if (response.status === 401) {
            console.log(
                "Access token expired. Refreshing..."
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

        console.log("API STATUS:", response.status);
        console.log("API RESPONSE:", responseText);

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









// import "server-only";

// // import { getAccessToken } from "../lib/actions";
// import {
//     getAccessToken,
//     handleRefresh,
// } from "../lib/actions";

// const API_HOST = process.env.API_HOST;

// if (!API_HOST) {
//     throw new Error("API_HOST is not configured");
// }

// const apiService = {
//     async get(url: string) {
//         const accessToken = await getAccessToken();

//         const response = await fetch(`${API_HOST}${url}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 "Content-Type": "application/json",
//             },
//             cache: "no-store",
//         });

//         if (!response.ok) {
//             const responseText = await response.text();

//             throw new Error(
//                 `API error: ${response.status} - ${responseText}`
//             );
//         }

//         return response.json();
//     },

    // async post(url: string, data: unknown) {
    //     const accessToken = await getAccessToken();

    //     const isFormData = data instanceof FormData;

    //     console.log("API URL:", `${API_HOST}${url}`);
    //     console.log("IS FORM DATA:", isFormData);
    //     console.log("ACCESS TOKEN EXISTS:", !!accessToken);

    //     const response = await fetch(`${API_HOST}${url}`, {
    //         method: "POST",

    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,

    //             ...(isFormData
    //                 ? {}
    //                 : {
    //                       "Content-Type": "application/json",
    //                   }),
    //         },

    //         body: isFormData
    //             ? data
    //             : JSON.stringify(data),

    //         cache: "no-store",
    //     });

    //     const responseText = await response.text();

    //     console.log("API STATUS:", response.status);
    //     console.log("API RESPONSE:", responseText);

    //     if (!response.ok) {
    //         throw new Error(
    //             `API error: ${response.status} - ${responseText}`
    //         );
    //     }

    //     return responseText
    //         ? JSON.parse(responseText)
    //         : {};
    // },


//     async post(url: string, data: unknown) {
//         let accessToken = await getAccessToken();
    
//         if (!accessToken) {
//             throw new Error("No access token available");
//         }
    
//         const isFormData = data instanceof FormData;
    
//         const makeRequest = async (token: string) => {
//             return await fetch(`${API_HOST}${url}`, {
//                 method: "POST",
    
//                 headers: {
//                     Authorization: `Bearer ${token}`,
    
//                     ...(isFormData
//                         ? {}
//                         : {
//                               "Content-Type": "application/json",
//                           }),
//                 },
    
//                 body: isFormData
//                     ? data
//                     : JSON.stringify(data),
    
//                 cache: "no-store",
//             });
//         };
    
//         let response = await makeRequest(accessToken);
    
//         // Access token expired
//         if (response.status === 401) {
//             console.log("Access token expired. Refreshing...");
    
//             accessToken = await handleRefresh();
    
//             if (!accessToken) {
//                 throw new Error("Could not refresh access token");
//             }
    
//             // Try the original request again
//             response = await makeRequest(accessToken);
//         }
    
//         const responseText = await response.text();
    
//         console.log("API STATUS:", response.status);
//         console.log("API RESPONSE:", responseText);
    
//         if (!response.ok) {
//             throw new Error(
//                 `API error: ${response.status} - ${responseText}`
//             );
//         }
    
//         return responseText
//             ? JSON.parse(responseText)
//             : {};
//     }

    
// };

// export default apiService;





// import "server-only";

// import { getAccessToken } from "../lib/actions";

// const API_HOST = process.env.API_HOST;

// if (!API_HOST) {
//     throw new Error("API_HOST is not configured");
// }

// const apiService = {
//     async get(url: string) {
//         const accessToken = await getAccessToken();

//         const response = await fetch(`${API_HOST}${url}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 "Content-Type": "application/json",
//             },
//             cache: "no-store",
//         });

//         if (!response.ok) {
//             throw new Error(`API error: ${response.status}`);
//         }

//         return response.json();
//     },

    // async post(url: string, data: unknown) {
    //     const accessToken = await getAccessToken();

    //     const response = await fetch(`${API_HOST}${url}`, {
    //         method: "POST",
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //         cache: "no-store",
    //     });

    //     if (!response.ok) {
    //         throw new Error(`API error: ${response.status}`);
    //     }

    //     return response.json();
    // },

//     async post(url: string, data: unknown) {
//         const accessToken = await getAccessToken();
    
//         const isFormData = data instanceof FormData;
    
//         const response = await fetch(`${API_HOST}${url}`, {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 ...(isFormData
//                     ? {}
//                     : {
//                           "Content-Type": "application/json",
//                       }),
//             },
//             body: isFormData
//                 ? data
//                 : JSON.stringify(data),
//             cache: "no-store",
//         });
    
//         const responseText = await response.text();
    
//         console.log("API STATUS:", response.status);
//         console.log("API RESPONSE:", responseText);
    
//         if (!response.ok) {
//             throw new Error(
//                 `API error: ${response.status} - ${responseText}`
//             );
//         }
    
//         return responseText
//             ? JSON.parse(responseText)
//             : {};
//     }

// };

// export default apiService;








// import "server-only";

// import { getAccessToken } from "../lib/actions";

// const API_HOST = process.env.API_HOST;

// if (!API_HOST) {
// throw new Error("API_HOST is not defined");
// }

// async function parseResponse(
// response: Response,
// method: string,
// url: string
// ) {
// const contentType = response.headers.get("content-type");


// if (!response.ok) {
//     const text = await response.text();

//     console.error(
//         `${method} API error:`,
//         response.status,
//         text
//     );

//     throw new Error(
//         `${method} ${url} failed with status ${response.status}`
//     );
// }

// if (!contentType?.includes("application/json")) {
//     const text = await response.text();

//     console.error(
//         "Expected JSON but received:",
//         text
//     );

//     throw new Error(
//         `Expected JSON response from ${url}`
//     );
// }

// return await response.json();


// }

// const apiService = {
// get: async function (url: string): Promise<any> {
// console.log("GET:", url);


//     const accessToken = await getAccessToken();

//     const response = await fetch(
//         `${API_HOST}${url}`,
//         {
//             method: "GET",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//                 ...(accessToken
//                     ? {
//                           Authorization:
//                               `Bearer ${accessToken}`,
//                       }
//                     : {}),
//             },
//             cache: "no-store",
//         }
//     );

//     const json = await parseResponse(
//         response,
//         "GET",
//         url
//     );

//     console.log("GET Response:", json);

//     return json;
// },

// post: async function (
//     url: string,
//     data: any
// ): Promise<any> {
//     console.log("POST:", url, data);

//     const accessToken = await getAccessToken();

//     const isFormData =
//         typeof FormData !== "undefined" &&
//         data instanceof FormData;

//     const response = await fetch(
//         `${API_HOST}${url}`,
//         {
//             method: "POST",

//             body: isFormData
//                 ? data
//                 : JSON.stringify(data),

//             headers: {
//                 Accept: "application/json",

//                 ...(isFormData
//                     ? {}
//                     : {
//                           "Content-Type":
//                               "application/json",
//                       }),

//                 ...(accessToken
//                     ? {
//                           Authorization:
//                               `Bearer ${accessToken}`,
//                       }
//                     : {}),
//             },

//             cache: "no-store",
//         }
//     );

//     const json = await parseResponse(
//         response,
//         "POST",
//         url
//     );

//     console.log("POST Response:", json);

//     return json;
// },

// postWithoutToken: async function (
//     url: string,
//     data: any
// ): Promise<any> {
//     console.log(
//         "POST without token:",
//         url,
//         data
//     );

//     const response = await fetch(
//         `${API_HOST}${url}`,
//         {
//             method: "POST",

//             body: JSON.stringify(data),

//             headers: {
//                 Accept: "application/json",
//                 "Content-Type":
//                     "application/json",
//             },

//             cache: "no-store",
//         }
//     );

//     const json = await parseResponse(
//         response,
//         "POST",
//         url
//     );

//     console.log(
//         "POST Response:",
//         json
//     );

//     return json;
// },


// };

// export default apiService;




//-------------------------------------------------------------
// simple ok 
// import { getAccessToken } from '../lib/actions';

// const apiService = {
//     get: async function (url: string): Promise<any> {
//         console.log('GET:', url);

//         const accessToken = await getAccessToken();

//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
//             {
//                 method: 'GET',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                     ...(accessToken
//                         ? { Authorization: `Bearer ${accessToken}` }
//                         : {}),
//                 },
//             }
//         );

//         const contentType = response.headers.get('content-type');

//         if (!response.ok) {
//             const text = await response.text();

//             console.error(
//                 'GET API error:',
//                 response.status,
//                 text
//             );

//             throw new Error(
//                 `GET ${url} failed with status ${response.status}`
//             );
//         }

//         if (!contentType?.includes('application/json')) {
//             const text = await response.text();

//             console.error(
//                 'Expected JSON but received:',
//                 text
//             );

//             throw new Error(
//                 `Expected JSON response from ${url}`
//             );
//         }

//         const json = await response.json();

//         console.log('GET Response:', json);

//         return json;
//     },

    // post: async function (
    //     url: string,
    //     data: any
    // ): Promise<any> {
    //     console.log('POST:', url, data);

    //     const accessToken = await getAccessToken();

    //     const isFormData = data instanceof FormData;

    //     const response = await fetch(
    //         `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
    //         {
    //             method: 'POST',
    //             body: isFormData
    //                 ? data
    //                 : JSON.stringify(data),
    //             headers: {
    //                 Accept: 'application/json',
    //                 ...(isFormData
    //                     ? {}
    //                     : { 'Content-Type': 'application/json' }),
    //                 ...(accessToken
    //                     ? { Authorization: `Bearer ${accessToken}` }
    //                     : {}),
    //             },
    //         }
    //     );

    //     const contentType = response.headers.get('content-type');

    //     if (!response.ok) {
    //         const text = await response.text();

    //         console.error(
    //             'POST API error:',
    //             response.status,
    //             text
    //         );

    //         throw new Error(
    //             `POST ${url} failed with status ${response.status}`
    //         );
    //     }

    //     if (!contentType?.includes('application/json')) {
    //         const text = await response.text();

    //         console.error(
    //             'Expected JSON but received:',
    //             text
    //         );

    //         throw new Error(
    //             `Expected JSON response from ${url}`
    //         );
    //     }

    //     const json = await response.json();

    //     console.log('POST Response:', json);

    //     return json;
    // post: async function (
    //     url: string,
    //     data: any
    // ): Promise<any> {
    
    //     console.log('POST:', url, data);
    
    //     const accessToken = await getAccessToken();
    //     const isFormData = data instanceof FormData;
    
    //     const response = await fetch(
    //         `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
    //         {
    //             method: 'POST',
    
    //             body: isFormData
    //                 ? data
    //                 : JSON.stringify(data),
    
    //             headers: {
    //                 Accept: 'application/json',
    
    //                 ...(isFormData
    //                     ? {}
    //                     : {
    //                           'Content-Type': 'application/json',
    //                       }),
    
    //                 ...(accessToken
    //                     ? {
    //                           Authorization: `Bearer ${accessToken}`,
    //                       }
    //                     : {}),
    //             },
    //         }
    //     );
    
    //     const contentType = response.headers.get('content-type');
    
        // if (!response.ok) {
        //     const text = await response.text();
    
        //     console.error(
        //         'POST API error:',
        //         response.status,
        //         text
        //     );
    
        //     throw new Error(
        //         `POST ${url} failed with status ${response.status}`
        //     );
        // }
//         if (!response.ok) {
//             const errorData = await response.json();
        
//             console.error(
//                 "POST API error:",
//                 response.status,
//                 errorData
//             );
        
//             throw errorData;
//         }
    
//         if (!contentType?.includes('application/json')) {
//             const text = await response.text();
    
//             console.error(
//                 'Expected JSON but received:',
//                 text
//             );
    
//             throw new Error(
//                 `Expected JSON response from ${url}`
//             );
//         }
    
//         const json = await response.json();
    
//         console.log('POST Response:', json);
    
//         return json;
//     },
//     // },

//     postWithoutToken: async function (
//         url: string,
//         data: any
//     ): Promise<any> {
//         console.log('POST without token:', url, data);

//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
//             {
//                 method: 'POST',
//                 body: JSON.stringify(data),
//                 // headers: {
//                 //     Accept: 'application/json',
//                 //     'Content-Type': 'application/json',
//                 // },
//             }
//         );

//         const contentType = response.headers.get('content-type');

//         if (!response.ok) {
//             const text = await response.text();

//             console.error(
//                 'POST API error:',
//                 response.status,
//                 text
//             );

//             throw new Error(
//                 `POST ${url} failed with status ${response.status}`
//             );
//         }

//         if (!contentType?.includes('application/json')) {
//             const text = await response.text();

//             console.error(
//                 'Expected JSON but received:',
//                 text
//             );

//             throw new Error(
//                 `Expected JSON response from ${url}`
//             );
//         }

//         const json = await response.json();

//         console.log('POST Response:', json);

//         return json;
//     },
// };
// export default apiService;
//---------------------------------------------------------------------------------------------------
// import { getAccessToken } from "../lib/actions";

// const apiService = {
//     // =========================
//     // GET
//     // =========================
//     get: async function (
//         url: string
//     ): Promise<any> {
//         console.log("GET:", url);

//         const accessToken = await getAccessToken();

//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
//             {
//                 method: "GET",
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",

//                     ...(accessToken
//                         ? {
//                               Authorization: `Bearer ${accessToken}`,
//                           }
//                         : {}),
//                 },
//             }
//         );

//         const contentType =
//             response.headers.get("content-type");

//         if (!response.ok) {
//             const text = await response.text();

//             console.error(
//                 "GET API error:",
//                 response.status,
//                 text
//             );

//             throw new Error(
//                 `GET ${url} failed with status ${response.status}`
//             );
//         }

//         if (!contentType?.includes("application/json")) {
//             const text = await response.text();

//             console.error(
//                 "Expected JSON but received:",
//                 text
//             );

//             throw new Error(
//                 `Expected JSON response from ${url}`
//             );
//         }

//         const json = await response.json();

//         console.log("GET Response:", json);

//         return json;
//     },

//     // =========================
//     // POST WITH TOKEN
//     // =========================
//     post: async function (
//         url: string,
//         data: any
//     ): Promise<any> {
//         console.log("POST:", url);
//         console.log("POST DATA:", data);
//         console.log("POST DATA TYPE:", typeof data);

//         const accessToken = await getAccessToken();

//         const isFormData = data instanceof FormData;

//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
//             {
//                 method: "POST",

//                 headers: {
//                     Accept: "application/json",

//                     // Do not manually set Content-Type for FormData.
//                     ...(isFormData
//                         ? {}
//                         : {
//                               "Content-Type":
//                                   "application/json",
//                           }),

//                     ...(accessToken
//                         ? {
//                               Authorization: `Bearer ${accessToken}`,
//                           }
//                         : {}),
//                 },

//                 body: isFormData
//                     ? data
//                     : JSON.stringify(data),
//             }
//         );

//         const contentType =
//             response.headers.get("content-type");

//         if (!response.ok) {
//             const text = await response.text();

//             console.error(
//                 "POST API error:",
//                 response.status,
//                 text
//             );

//             throw new Error(
//                 `POST ${url} failed with status ${response.status}`
//             );
//         }

//         if (!contentType?.includes("application/json")) {
//             const text = await response.text();

//             console.error(
//                 "Expected JSON but received:",
//                 text
//             );

//             throw new Error(
//                 `Expected JSON response from ${url}`
//             );
//         }

//         const json = await response.json();

//         console.log("POST Response:", json);

//         return json;
//     },

//     // =========================
//     // POST WITHOUT TOKEN
//     // =========================
//     postWithoutToken: async function (
//         url: string,
//         data: any
//     ): Promise<any> {
//         console.log("POST WITHOUT TOKEN:", url);
//         console.log("DATA:", data);
//         console.log("DATA TYPE:", typeof data);

//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
//             {
//                 method: "POST",

//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                 },

//                 body: JSON.stringify(data),
//             }
//         );

//         const contentType =
//             response.headers.get("content-type");

//         if (!response.ok) {
//             const text = await response.text();

//             console.error(
//                 "POST API error:",
//                 response.status,
//                 text
//             );

//             throw new Error(
//                 `POST ${url} failed with status ${response.status}`
//             );
//         }

//         if (!contentType?.includes("application/json")) {
//             const text = await response.text();

//             console.error(
//                 "Expected JSON but received:",
//                 text
//             );

//             throw new Error(
//                 `Expected JSON response from ${url}`
//             );
//         }

//         const json = await response.json();

//         console.log(
//             "POST WITHOUT TOKEN Response:",
//             json
//         );

//         return json;
//     },
// };

// export default apiService;



// // ----------------------------------------------------------------
// import { getAccessToken } from '../lib/actions';

// const apiService = {
//     get: async function (url: string): Promise<any> {
//         console.log('GET:', url);

//         const accessToken = await getAccessToken();

//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
//             {
//                 method: 'GET',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                     ...(accessToken
//                         ? { Authorization: `Bearer ${accessToken}` }
//                         : {}),
//                 },
//             }
//         );

//         const contentType = response.headers.get('content-type');

//         if (!response.ok) {
//             const text = await response.text();

//             console.error(
//                 'GET API error:',
//                 response.status,
//                 text
//             );

//             throw new Error(
//                 `GET ${url} failed with status ${response.status}`
//             );
//         }

//         if (!contentType?.includes('application/json')) {
//             const text = await response.text();

//             console.error(
//                 'Expected JSON but received:',
//                 text
//             );

//             throw new Error(
//                 `Expected JSON response from ${url}`
//             );
//         }

//         const json = await response.json();

//         console.log('GET Response:', json);

//         return json;
//     },

//     post: async function (
//         url: string,
//         data: any
//     ): Promise<any> {
//         console.log('POST:', url, data);

//         const accessToken = await getAccessToken();

//         const isFormData = data instanceof FormData;

//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
//             {
//                 method: 'POST',
//                 body: isFormData
//                     ? data
//                     : JSON.stringify(data),
//                 headers: {
//                     Accept: 'application/json',
//                     ...(isFormData
//                         ? {}
//                         : { 'Content-Type': 'application/json' }),
//                     ...(accessToken
//                         ? { Authorization: `Bearer ${accessToken}` }
//                         : {}),
//                 },
//             }
//         );

//         const contentType = response.headers.get('content-type');

//         if (!response.ok) {
//             const text = await response.text();

//             console.error(
//                 'POST API error:',
//                 response.status,
//                 text
//             );

//             throw new Error(
//                 `POST ${url} failed with status ${response.status}`
//             );
//         }

//         if (!contentType?.includes('application/json')) {
//             const text = await response.text();

//             console.error(
//                 'Expected JSON but received:',
//                 text
//             );

//             throw new Error(
//                 `Expected JSON response from ${url}`
//             );
//         }

//         const json = await response.json();

//         console.log('POST Response:', json);

//         return json;
//     },

//     postWithoutToken: async function (
//         url: string,
//         data: any
//     ): Promise<any> {
//         console.log('POST without token:', url, data);

//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
//             {
//                 method: 'POST',
//                 body: JSON.stringify(data),
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         const contentType = response.headers.get('content-type');

//         if (!response.ok) {
//             const text = await response.text();

//             console.error(
//                 'POST API error:',
//                 response.status,
//                 text
//             );

//             throw new Error(
//                 `POST ${url} failed with status ${response.status}`
//             );
//         }

//         if (!contentType?.includes('application/json')) {
//             const text = await response.text();

//             console.error(
//                 'Expected JSON but received:',
//                 text
//             );

//             throw new Error(
//                 `Expected JSON response from ${url}`
//             );
//         }

//         const json = await response.json();

//         console.log('POST Response:', json);

//         return json;
//     },
// };
// export default apiService;
