const { connection } =  require('../../lib/common/connection');

module.exports = async (scope, ctx) => {
    const sql ='SELECT id,name,level FROM articleMenu';
    const conn = await connection();
    const menus = await conn.query(sql);
    const firstMenus = [],
    secondMenus = []
    menus.forEach(item => {
        if (item.level === 1) {
            firstMenus.push(item)
        } else {
            secondMenus.push(item)
        }
    });
    scope.firstMenus = firstMenus
    scope.secondMenus = secondMenus
}
