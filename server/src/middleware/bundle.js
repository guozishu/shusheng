const config = require('../../config')
const { loadFile } = require('../lib/utils/index.js')

module.exports = function () {
  let assets = loadFile(config.chunkMapPath)

  return async function (ctx, next) {
    const { scope } = ctx.state
    if (config.NODE_ENV === 'development') {
      assets = loadFile(config.chunkMapPath)
    }

    const loadingStatic = function (keyPath) {
      return `/dist${assets.assets[`${keyPath}`]}`
    }

    ctx.state.scope = Object.assign({}, scope, {
      bundle: function (keyPath) {
        return loadingStatic(keyPath)
      }
    })

    await next()
  }
}
