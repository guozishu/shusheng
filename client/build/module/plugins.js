/**
 * 插件
 */
// 将样式表抽离成专门的单独文件。
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 提供带 Content-Encoding 编码的压缩版的资源（gzip压缩）
const CompressionPlugin = require('compression-webpack-plugin')
// 用于优化\最小化CSS。
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 针对css容错处理，修复
const safePostCssParser = require('postcss-safe-parser')
// 压缩js
const TerserPlugin = require('terser-webpack-plugin')
// 清理插件--清理 /dist 文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// manifest 缓存
const ManifestPlugin = require('webpack-manifest-plugin')

const { getIfUtils, removeEmpty } = require("webpack-config-utils");
const { ifProduction: ifProd, ifNotProduction: ifDev } = getIfUtils(
  process.env.NODE_ENV
);

const NODE_ENV = ifProd("prod", "dev")

const name = '[name]'
const hash = '[hash:8]' // 非覆盖式发布，自己小项目就不用了

function miniCssExtractPluginFun () {
  return new MiniCssExtractPlugin({ // 适用于所有用例，css抽出
    filename: `${name}${NODE_ENV !== 'dev' ? `-${hash}` : ''}.css`
  })
}

function optimizeCSSAssetsPluginFun () {
  return new OptimizeCSSAssetsPlugin({
    cssProcessorOptions: {
      parser: safePostCssParser,
      map: {
        inline: false,
        annotation: true
      }
    }
  })
}

function compressionPluginFun () {
  return new CompressionPlugin({
    algorithm: 'gzip',
    test: /\.(js|css)$/
  })
}

function manifestPluginFun () {
  return new ManifestPlugin({
    fileName: 'assets.json',
    publicPath: '/',
    filter: function (file) {
      return file.path.match(/.(js|css)$/)
    },
    generate: (seed, files) => {
      const manifestFiles = files.reduce(function (manifest, file) {
        manifest[file.name.replace(/\//g, '.')] = file.path
        return manifest
      }, seed)
      
      return {
        assets: manifestFiles
      }
    },
    serialize: (manifest) => JSON.stringify(manifest, null, 4)
  })
}

function terserPluginFun () {
  return new TerserPlugin({
    terserOptions: {
      parse: {
        ecma: 8
      },
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2
      },
      mangle: {
        safari10: true
      },
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true
      }
    },
    parallel: true,
    cache: true,
    sourceMap: false
  })
}

function cleanWebpackPluginFun () {
  return new CleanWebpackPlugin()
}

module.exports = {
  miniCssExtractPluginFun,
  optimizeCSSAssetsPluginFun,
  compressionPluginFun,
  manifestPluginFun,
  terserPluginFun,
  cleanWebpackPluginFun
}
