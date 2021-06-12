module.exports = () => {
  return async (ctx, next) => {
    ctx.state.scope = {
        requestId: Date.now()
    }
    await next()
  }
}
