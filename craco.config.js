const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

/**
 * Fallbacks are required due to webpack 5 no longer supplying node polyfills by default
 * Rather than eject from CRA, we use craco to patch in what we need. What is included here is
 * only what is required to resolve all compiler errors.
 * See https://github.com/facebook/create-react-app/issues/11756
 */

module.exports = {
  webpack: {
    configure: {
      plugins: [new NodePolyfillPlugin()],
    },
  },
};
