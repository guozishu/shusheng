const Logger = require('guozishu-mango-logger');
const utils = require('utility')
const path = require('path')
/**
 * 日志
 *  ctx.logger.error('error msg');
 *  ctx.logger.info('info msg');
 *  ctx.logger.warn('warn msg');
 *  ctx.logger.debug(new Error('error msg'));
 * 要用自己品
 */

module.exports = function(){
  return async (ctx, next) => {
    ctx.logger = new Logger({
      dir: path.resolve(__dirname, '../../logs'),
      file: `${utils.YYYYMMDD()}.log`
    })
    await next()
  }
}