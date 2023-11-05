/** @type {import('next').NextConfig} */
// const nextConfig = {};

// const isProd = process.env.NODE_ENV === "production";

// module.exports = nextConfig;

// module.exports = {
// webpack(config) {
//   config.module.rules.push({
//     test: /\.svg$/,
//     use: [{ loader: "@svgr/webpack", options: { icon: true } }],
//   });
//   return config;
// },
// images: {
//   remotePatterns: [
//     {
//       protocol: "https",
//       hostname: "fakestoreapi.com",
//       port: "",
//       pathname: "/img/**",
//     },
//     {
//       protocol: "https",
//       hostname: "img.freepik.com",
//       port: "",
//       pathname: "/free-vector/**",
//     },
//   ],
// },
// };

const nextConfig = {
  // Use the CDN in production and localhost for development.
  // assetPrefix: isProd ? "https://сdn.incomparable-truffle-a06b40.netlify.app" : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
        port: "",
        pathname: "/img/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vast-tam-lamb.cyclic.app",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  },
};

module.exports = nextConfig;
