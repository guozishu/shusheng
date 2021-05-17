
const { connection } =  require('../lib/common/connection');
const {
  guidStrList,
  session
} = require('../lib/common/common');

class Home {
  async query(scope) {
    const ctx = this;
    const params = ctx.request.body;
    const { name,fields,condition } = params
    const conn = await connection();
    const sql = `select ${fields} from ${name} where 1 = 1 ${condition?`and ${condition}`:''}`
    const result = await conn.query(sql);
    
    await ctx.renderJson({
      code: 0,
      data: result
    })
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
    const { name,fields } = ctx.request.body;
    const conn = await connection();
    const keys = Object.keys(fields),
          values = Object.values(fields);
    let columnMames = '?,'.repeat(keys.length)
    columnMames = `(${columnMames.slice(0,columnMames.length-1)})`;
    const sql = `INSERT INTO ${name} (${keys.join(',')}) value ${columnMames}`
    const result = await conn.query(sql,values);
    let res = {
      code: -1,
      message: 'failed'
    }
    if (result.affectedRows) {
      res = {
        code: 0,
        message:'success'
      }
    }
    await ctx.renderJson(res)
  }
}

module.exports = Home;
