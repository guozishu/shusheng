const master = require('../controllers/common/index')

module.exports = () => {
  return async (ctx, next) => {
    ctx.state.scope = {
        requestId: Date.now()
    }
    await master(ctx.state.scope, ctx)
    await next()
  }
}
