const path = require("path");
const { override, addWebpackAlias, getBabelLoader } = require("customize-cra");

const prependBabelPlugin = (plugin) => (config) => {
  getBabelLoader(config).options.plugins.unshift(plugin);
  return config;
};

module.exports = override(
  prependBabelPlugin("styled-jsx/babel"),
  addWebpackAlias({
    "@env": path.resolve(
      __dirname,
      "src/env",
      process.env.MAIN_ENV || process.env.ENV || "prod"
    ),
    "~": path.resolve(__dirname, "src/"),
    react: path.resolve(__dirname, "node_modules/react"),
  })
);
