const koaError = require('koa-error')
const path = require('path')
/**
 * 404 error处理
 */

module.exports = () => {
  return koaError({
    engine: 'nunjucks',
    template: path.join(__dirname, '../views/error/index.html'),
    accepts: ['html']
  })
}
