const compress = require('koa-compress')
/**
 * 针对网络传输的数据进行压缩来提高传输速度
 */

module.exports = () => {
  return compress({
    filter (content_type) {
      return /text/i.test(content_type)
    },
    threshold: 1024,
    gzip: {
      flush: require('zlib').constants.Z_SYNC_FLUSH
    },
    deflate: {
      flush: require('zlib').constants.Z_SYNC_FLUSH
    },
    br: false // disable brotli
  })
}
