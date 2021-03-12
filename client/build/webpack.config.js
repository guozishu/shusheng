const { getIfUtils, removeEmpty } = require("webpack-config-utils");

const { ifProduction: ifProd, ifNotProduction: ifDev } = getIfUtils(
  process.env.NODE_ENV
);

const { entry } = require("./module/entry");
const { output } = require("./module/output");
const {
  cssModule,
  sACssModule,
  photoModule,
  fontsModule,
  jsModule,
  tsModule,
} = require("./module/loaders");

module.exports = {
  mode: ifProd("production", "development"),
  devtool: ifProd("source-map", "cheap-module-source-map"), // "inline-source-map",
  target: "web",
  entry: entry,
  output: output,
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    //根据 此规范进行解析。
    aliasFields: ["browser"],
  },
  module: {
    rules: [
      jsModule(),
      tsModule(),
      fontsModule(),
      cssModule(),
      // sACssModule,
      // photoModule,
      
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "initial",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "framework",
        },
        default: false,
      },
    },
  },
};
