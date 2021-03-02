/**
 * render json
 */
module.exports = () => {
  return async (ctx, next) => {
    ctx.renderJSON = ctx.renderJson = function (json) {
      this.body = JSON.stringify(json)
    }.bind(ctx)

    await next()
  }
}
