const path = require('path')
const outputDir = path.resolve(__dirname, '../../dist')

const outputFun = () => {
  let options = {
    path: outputDir,
    filename: '[name].js'
  }
  if (process.env.NODE_ENV === 'production') {
    options = {
      path: outputDir,
      hashDigestLength: 8,
      filename: '[name]-[hash].js'
    }
  }
  return options
}

module.exports = {
  output: outputFun()
}