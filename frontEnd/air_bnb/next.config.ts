// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactCompiler: true,

//   turbopack: {
//     root: __dirname,
//   },
// };

// export default nextConfig;
///** @type {import('next').NextConfig} */
//-----------------------------------------------------------
// const nextConfig = {
//   images: {
//       remotePatterns: [
//           {
//               protocol: 'http',
//               hostname: 'localhost',
//               port: '8000',
//               pathname: '/**'
//           },
//           {
//               protocol: 'http',
//               hostname: '64.226.81.32',
//               port: '1337',
//               pathname: '/**'
//           }
//       ]
//   }
// };

// export default nextConfig;
//-----------------------------------------------------------
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        dangerouslyAllowLocalIP: true,

        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "64.226.81.32",
                port: "1337",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;




