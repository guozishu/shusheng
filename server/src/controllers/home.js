
const { connection, pool } =  require('../lib/common/connection');
const {
  guidStrList,
  session
} = require('../lib/common/common');
const Pass = require('./pass')

class Home {
  async query(scope) {
    const ctx = this;
    const pass = new Pass();
    const {isLogin} = await pass.pass.bind(ctx)(scope)
    let result = {
      code: -1,
      data: [],
      message: 'not login'
    }
    if (isLogin) {
      const params = ctx.request.body;
      const { name,fields,condition } = params
      const conn = await connection();
      const sql = `select ${fields} from ${name} where 1 = 1 ${condition?`and ${condition}`:''}`
      const res = await conn.query(sql);
      result = {
        code: 0,
        data: res
      }
    }
    await ctx.renderJson(result)
  }
  /**
   * { 
   *    "name":"articleType",
   *     "fields":  {
   *        "name":"test2"
   *     }
   * }
   */
  async insert(scope){
    const ctx = this;
    const pass = new Pass();
    const {isLogin} = await pass.pass.bind(ctx)(scope)
    let res = {
      code: -1,
      message: 'failed'
    }
    if (isLogin) {
      const { name,fields } = ctx.request.body;
      const conn = await connection();
      const keys = Object.keys(fields),
            values = Object.values(fields);
      let columnMames = '?,'.repeat(keys.length)
      columnMames = `(${columnMames.slice(0,columnMames.length-1)})`;
      const sql = `INSERT INTO ${name} (${keys.join(',')}) value ${columnMames}`
      const result = await conn.query(sql,values);
      if (result.affectedRows) {
        res = {
          code: 0,
          message:'success'
        }
      }
    }
    await ctx.renderJson(res)
  }
  async delete(scope) {
    const ctx = this;
    const pass = new Pass();
    const {isLogin} = await pass.pass.bind(ctx)(scope)
    let result = {
      code: -1,
      data: [],
      message: 'not login'
    }
    if (isLogin) {
      const params = ctx.request.body;
      const { name,fields } = params
      const conn = await connection();
      let condition = '';
      for(const key in fields) {
        condition += ` AND ${key}=${fields[key]} `
      }
      const sql = `DELETE FROM ${name} WHERE 1=1 ${condition}`
      const res = await conn.query(sql);
      if (res.affectedRows) {
        result = {
          code: 0,
          data:res,
          message:'success'
        }
      }
    }
    await ctx.renderJson(result)
  }
  async transaction(scope) {
    const ctx = this;
    const pass = new Pass();
    const { isLogin } = await pass.pass.bind(ctx)(scope)
    const res = {
      code: -1,
      message: 'failed'
    }
    if (isLogin) {
      const { multipleTable } = ctx.request.body;
      const conn = await connection();
      const result = await conn.beginTransaction()
        .then(() => {
          for (const [index, item] of multipleTable.entries()) {
            const { name, fields } = item;
            const keys = Object.keys(fields),values = Object.values(fields);
            let columnMames = '?,'.repeat(keys.length);
            columnMames = `(${columnMames.slice(0, columnMames.length - 1)})`;
            const sql = `INSERT INTO ${name} (${keys.join(', ')}) value ${columnMames}`;
            console.log(sql, values)
            //INSERT INTO myTable value (?, ?)", [1, "mariadb"]
            if (index !== multipleTable.length) {
              conn.query(sql, values)
            } else {
              return conn.query(sql,values)
            }
          }
        })
        .then(() => {
          conn.commit();
          return {
            code: 0,
            message: 'success'
          }
        })
        .catch((err) => {
          conn.rollback();
          return res
        })

      await ctx.renderJson(result)

    }
  }
}

module.exports = Home;
