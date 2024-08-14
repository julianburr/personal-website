/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: "@svgr/webpack",
        options: {
          dimensions: true,
          svgo: true,
          svgoConfig: require.resolve("./svgo.config.js"),
        },
      },
    });

    return config;
  },
};

export default nextConfig;
