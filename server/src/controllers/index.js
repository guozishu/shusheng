
const { connection } =  require('../lib/common/connection');

class Index {
  async index() {
    const ctx = this;
    await ctx.render('index')
  }
  async blog(scope) {
    const ctx = this;
    await ctx.render('blog')
  }
  async guide() {
    const ctx = this;
    await ctx.render('guide')
  }
  async home() {
    const ctx = this;
    const body = ctx.request.body
    const getbody = ctx.query
    await ctx.renderJson({
      test:'test',
      body,
      getbody
    })
    //await ctx.render('home')
  }
}

module.exports = Index;
