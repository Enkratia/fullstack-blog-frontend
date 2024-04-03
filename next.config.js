/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  output: "standalone",
  transpilePackages: [
    "@reduxjs/toolkit",
    "@svgr/webpack",
    "@tiptap/extension-color",
    "@tiptap/extension-text-style",
    "@tiptap/extension-underline",
    "@tiptap/html",
    "@tiptap/pm",
    "@tiptap/react",
    "@tiptap/starter-kit",
    "@tiptap/core",
    "zeed-dom",
    "embla-carousel-autoplay",
    "embla-carousel-react",
    "next",
    "next-auth",
    "normalize.css",
    "overlayscrollbars-react",
    "qs",
    "react",
    "react-dom",
    "react-imask",
    "react-paginate",
    "react-redux",
    "sharp",
    "sonner",
    "use-immer",
    "immer",
  ],
  images: {
    minimumCacheTTL: 31540000000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "finsweet.ru",
        port: "",
        pathname: "/backend-api/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/backend-api/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/images/**",
      },
      {
        protocol: "http",
        hostname: "192.168.240.3",
        port: "3001",
        pathname: "/api/images/**",
      },
    ],
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);

// config.plugins.push(new MiniCssExtractPlugin());
