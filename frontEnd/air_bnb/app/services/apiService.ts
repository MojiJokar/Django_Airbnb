// 
import { getAccessToken } from '../lib/actions';

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('GET:', url);

        const accessToken = await getAccessToken();

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...(accessToken
                        ? { Authorization: `Bearer ${accessToken}` }
                        : {}),
                },
            }
        );

        const contentType = response.headers.get('content-type');

        if (!response.ok) {
            const text = await response.text();

            console.error(
                'GET API error:',
                response.status,
                text
            );

            throw new Error(
                `GET ${url} failed with status ${response.status}`
            );
        }

        if (!contentType?.includes('application/json')) {
            const text = await response.text();

            console.error(
                'Expected JSON but received:',
                text
            );

            throw new Error(
                `Expected JSON response from ${url}`
            );
        }

        const json = await response.json();

        console.log('GET Response:', json);

        return json;
    },

    post: async function (
        url: string,
        data: any
    ): Promise<any> {
        console.log('POST:', url, data);

        const accessToken = await getAccessToken();

        const isFormData = data instanceof FormData;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
            {
                method: 'POST',
                body: isFormData
                    ? data
                    : JSON.stringify(data),
                headers: {
                    Accept: 'application/json',
                    ...(isFormData
                        ? {}
                        : { 'Content-Type': 'application/json' }),
                    ...(accessToken
                        ? { Authorization: `Bearer ${accessToken}` }
                        : {}),
                },
            }
        );

        const contentType = response.headers.get('content-type');

        if (!response.ok) {
            const text = await response.text();

            console.error(
                'POST API error:',
                response.status,
                text
            );

            throw new Error(
                `POST ${url} failed with status ${response.status}`
            );
        }

        if (!contentType?.includes('application/json')) {
            const text = await response.text();

            console.error(
                'Expected JSON but received:',
                text
            );

            throw new Error(
                `Expected JSON response from ${url}`
            );
        }

        const json = await response.json();

        console.log('POST Response:', json);

        return json;
    },

    postWithoutToken: async function (
        url: string,
        data: any
    ): Promise<any> {
        console.log('POST without token:', url, data);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );

        const contentType = response.headers.get('content-type');

        if (!response.ok) {
            const text = await response.text();

            console.error(
                'POST API error:',
                response.status,
                text
            );

            throw new Error(
                `POST ${url} failed with status ${response.status}`
            );
        }

        if (!contentType?.includes('application/json')) {
            const text = await response.text();

            console.error(
                'Expected JSON but received:',
                text
            );

            throw new Error(
                `Expected JSON response from ${url}`
            );
        }

        const json = await response.json();

        console.log('POST Response:', json);

        return json;
    },
};
export default apiService;



// // 
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

