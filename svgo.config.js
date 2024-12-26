module.exports = {
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
};
