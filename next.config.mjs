const svgrOptions = {
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
    ],
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: svgrOptions,
          },
        ],
        as: '*.js',
      },
    },
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: '@svgr/webpack',
        options: svgrOptions,
      },
    });

    return config;
  },
};

export default nextConfig;
