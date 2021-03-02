module.exports = function () {
    return async function cacheControl(ctx, next) {
        console.log(ctx.url)
        if (ctx.url) {
          ctx.set('Cache-Control', 'max-age=120');
        }
        await next();
    }
  }