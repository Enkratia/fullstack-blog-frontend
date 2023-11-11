/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "s3-alpha-sig.figma.com",
    //     port: "",
    //     pathname: "/img/**",
    //   },
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        port: "",
        pathname: "/**",
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
