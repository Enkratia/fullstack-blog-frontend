/** @type {import('next').NextConfig} */

// test
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// **

const nextConfig = {
  // output: "standalone",
  images: {
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
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/images/**",
      },
    ],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    // config.module.rules.push(
    //   {
    //     test: /\.svg$/,
    //     issuer: /\.[jt]sx?$/,
    //     use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    //   },
    // );

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

      // test
      // {
      //   test: /\.(sc|c)ss$/,
      //   use: ["style-loader", "css-loader", "postcss-loader"],
      // },
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //     },
      //     {
      //       loader: "css-loader",
      //     },
      //     {
      //       loader: "sass-loader",
      //     },
      //   ],
      // },
    );
    // config.plugins.push(new MiniCssExtractPlugin());

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
