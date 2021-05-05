/**
 * Webpack watch Mode and webpack-dev-server
 * {watch && wds} 启用后，监视模式将检测对文件所做的更改并自动重新编译。
 * WDS是在内存中运行的开发服务器，这意味着捆绑包的内容不会写到文件中，而是存储在内存中。模块热替换
 */
const path = require('path')

exports.devServer = {
  contentBase: path.join(__dirname,'../../', 'dist'),
  compress: true,
  port: 3000,
}
