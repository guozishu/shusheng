
const { connection } =  require('../lib/common/connection');
const {
  guidStrList,
  session
} = require('../lib/common/common');
const constant = require('../constants/transation')

class Index {
  async index() {
    const ctx = this;
    await ctx.render('index')
  }
  async blog(scope) {
    const ctx = this;
    await ctx.render('blog')
  }
  async entry(scope) {
    const ctx = this;
    scope.isLogin = 0
    const sessionToken = session.get('token');
    const cookieToken=ctx.cookies.get('token');
    if (sessionToken && sessionToken === cookieToken) {
      scope.isLogin =  1
    }
    await ctx.render('entry')
  }
  async pass(scope) {
    const ctx = this;
    let result = {
      isLogin: false
    }
    const sessionToken = session.get('token');
    const cookieToken=ctx.cookies.get('token');
    if (sessionToken && sessionToken === cookieToken) {
      result.isLogin =  true
    }
    await ctx.renderJson(result)
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

  async login(scope) {
    const ctx =this;
    const {user ,pwd } = ctx.request.body;
    const date = new Date();
    const time = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}`;
    let result = {
      data: 'failed',
      code: -1
    };
    if (user === 'wanglong' && pwd === `guozishu${time}`) {
      const token = guidStrList(5);
      session.set('token', token, 21600);
      ctx.cookies.set("token", token, {
        domain: ctx.hostname,
        path: '/',
        maxAge: 21600000
      });
      result.data = 'success';
      result.code = 0
    }
    await ctx.renderJson(result)
  }
  async select(scope) {
    const ctx = this;
    let result = {
      code: -1,
      message: 'error'
    }
    const params = ctx.request.body;
    const { name,fields,condition } = params
    const conn = await connection();
    const sql = `select ${fields} from ${name} where 1 = 1 ${condition?`and ${condition}`:''}`
    const res = await conn.query(sql);
    result = {
      code: 0,
      data: res
    }
    await ctx.renderJson(result)
  }
  async queryData(scope) {
    const ctx = this;
    // const pass = new Pass();
    // const {isLogin} = await pass.pass.bind(ctx)(scope)
    let result = {
      code: -1,
      data: [],
      message: 'not login'
    }
    // if (isLogin) {
      const params = ctx.request.body;
      let { name,fields,condition,needTotalPage,supplement,mappingProperty,searchKeyword } = params;
      if (mappingProperty) {
        name = constant[mappingProperty][name];
        fields = constant[mappingProperty][fields];
        condition = `${constant[mappingProperty][condition]} ${supplement}`;
        if (needTotalPage) {
          needTotalPage = {
            ...needTotalPage,
            name: constant[mappingProperty][needTotalPage.name],
            fields: constant[mappingProperty][needTotalPage.fields]
          }
        }
      }
      const conn = await connection();
      let likeQuery = ''
      if (searchKeyword && searchKeyword.keyword) {
        likeQuery = ` AND ${searchKeyword.fields} LIKE '%${searchKeyword.keyword}%' `
      }
      if (needTotalPage && needTotalPage.isPagination) {
        const { name,fields } = needTotalPage;
        const sql = `select ${fields} from ${name} where 1=1 ${likeQuery}`
        const res = await conn.query(sql);
        result.total = Array.isArray(res)? res[0]: res;
      }
      const sql = `select ${fields} from ${name} where 1 = 1 ${likeQuery} ${condition?`and ${condition}`:''}`
      const res = await conn.query(sql);
      result.code = 0;
      result.data = res;
      result.message = 'success';
    //}
    await ctx.renderJson(result)
  }
}

module.exports = Index;
