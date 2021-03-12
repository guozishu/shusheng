const path = require('path')
const fs = require('fs')
// 扩展名
const extname = ['tsx', 'ts', 'css']
const filePath = path.resolve(__dirname, '../../src')

function getPages () {
  return fs.readdirSync(path.join(filePath, 'pages'))
}

function getEntries() {
  const pages = getPages()
  let entries = {}
  for (let page of pages) {
    if (/^[a-zA-Z]+$/.test(page)) {
      entries[`${page}/index`] = path.join(filePath,`pages/${page}/index.${extname[0]}`)
    }
  }
  entries['common'] = path.join(filePath,`common/index.${extname[0]}`)
  return entries
}

/**
 * 入口
 */
module.exports = {
  entry: getEntries()
}