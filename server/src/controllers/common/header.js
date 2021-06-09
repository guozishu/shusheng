const { connection } =  require('../../lib/common/connection');
const { getPathNameParams } = require('../../lib/utils/index')

module.exports = async (scope, ctx) => {
    const currentRoute = getPathNameParams(ctx.href, 1)[0] || 'js';
    const sql ='SELECT id,name,level,routeName FROM articleType';
    const conn = await connection();
    const menus = await conn.query(sql);
    const firstMenus = [],
    secondMenus = []
    menus.forEach(item => {
        if (item.level === 1) {
            item.isActive = item.routeName === currentRoute
            firstMenus.push(item)
        } else {
            secondMenus.push(item)
        }
    });
    scope.firstMenus = firstMenus
    scope.secondMenus = secondMenus
}
