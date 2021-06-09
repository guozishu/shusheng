const { URL } = require('url');

/**
 * 加载器函数
 * @param {String} filepath 路径
 *
 */
function loadFile (filepath) {
  try {
    // require js module
    const obj = require(filepath)
    if (!obj) return obj
    // it's es module
    if (obj.__esModule) return 'default' in obj ? obj.default : obj
    return obj
  } catch (err) {
    err.message = `[util] load file: ${filepath}, error: ${err.message}`
    throw err
  }
}

const getPathNameParams = (url, num = 1) => {
  const pathName = new URL(url).pathname
  return pathName.split('/').slice(-num)
}

module.exports = {
  loadFile,
  getPathNameParams
}
