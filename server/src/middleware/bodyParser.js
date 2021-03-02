const koaBody = require('koa-body');
/**
 * 请求头解析
 * ctx.request.body
 * ctx.query
 */

module.exports = () => {
  return koaBody()
};