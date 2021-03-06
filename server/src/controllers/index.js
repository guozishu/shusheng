
class Index {
  async index() {
    const ctx = this;
    await ctx.render('index')
  }
  async home() {
    const ctx = this;
    const body = ctx.request.body
    const getbody = ctx.query
    // await ctx.renderJson({
    //   test:'test',
    //   body,
    //   getbody
    // })
    await ctx.render('index')
  }
}

module.exports = Index;
