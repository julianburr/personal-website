/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },

  redirects: [
    {
      source: "/assets/ddd-brisbane-2022-slides.pdf",
      destination:
        "https://storage.cloud.google.com/julianburr-me/talk-slides/yes-your-browser-can-do-that-probably--ddd-brisbane-2022.pdf",
      permanent: true,
    },
    {
      source: "/assets/ddd-melbourne-2024-slides.pdf",
      destination:
        "https://storage.cloud.google.com/julianburr-me/talk-slides/is-it-a-bird-is-it-a-plane--ddd-melbourne-2024.pdf",
      permanent: true,
    },
    {
      source: "/assets/developer-week-2024-slides.pdf",
      destination:
        "https://storage.cloud.google.com/julianburr-me/talk-slides/quantum-computing-for-classical-developers--dwx-2024.pdf",
      permanent: true,
    },
    {
      source: "/assets/dont-stay-hydrated-brisjs-2024-slides.pdf",
      destination:
        "https://storage.cloud.google.com/julianburr-me/talk-slides/dont-stay-hydrated--brisjs-2024.pdf",
      permanent: true,
    },
    {
      source: "/assets/dont-stay-hydrated-react-connection-2024-slides.pdf",
      destination:
        "https://storage.cloud.google.com/julianburr-me/talk-slides/dont-stay-hydrated--brisjs-2024.pdf",
      permanent: true,
    },
    {
      source: "/assets/react-advanced-london-2024-slides.pdf",
      destination:
        "https://storage.cloud.google.com/julianburr-me/talk-slides/lets-build-suspense--react-advanced-london-2024.pdf",
      permanent: true,
    },
    {
      source: "/assets/react-summit-us-2024-slides.pdf",
      destination:
        "https://storage.cloud.google.com/julianburr-me/talk-slides/lets-build-suspense--react-summit-us-2024.pdf",
      permanent: true,
    },
    {
      source: "/assets/slashnew-2024-slides.pdf",
      destination:
        "https://storage.cloud.google.com/julianburr-me/talk-slides/yes-your-browser-can-do-that-probably--slashnew-2024.pdf",
      permanent: true,
    },
    {
      source: "/assets/wearedevelopers-world-congress-2024-slides.pdf",
      destination:
        "https://storage.cloud.google.com/julianburr-me/talk-slides/quantum-computing-for-classical-developers--world-congress-2024.pdf",
      permanent: true,
    },
    {
      source: "/assets/web-apis-sydjs-2023-slides.pdf",
      destination:
        "https://storage.cloud.google.com/julianburr-me/talk-slides/web-apis-you-might-not-know--sydjs-2023.pdf",
      permanent: true,
    },
    {
      source: "/assets/web-directions-code-2024-slides.pdf",
      destination:
        "https://storage.cloud.google.com/julianburr-me/talk-slides/yes-your-browser-can-do-that-probably--web-directions-code-2024.pdf",
      permanent: true,
    },
    {
      source: "/assets/xtremejs-2024-slides.pdf",
      destination:
        "https://storage.cloud.google.com/julianburr-me/talk-slides/yes-your-browser-can-do-that-probably--xtremejs-2024.pdf",
      permanent: true,
    },
  ],

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: "@svgr/webpack",
        options: {
          svgoConfig: {
            plugins: [
              // Use default presets except removing the view box
              {
                name: "preset-default",
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      },
    });

    return config;
  },
};

export default nextConfig;
