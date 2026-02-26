import path from 'node:path';
import url from 'node:url';

// 1. Manually define __dirname for ESM
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    root: path.resolve(__dirname, '.'),
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
