const path = require('path')

const { entry } = require('./module/entry')
const output = require('./module/output')

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: entry,
  output: output,
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    //根据 此规范进行解析。
    aliasFields: ['browser']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
};
