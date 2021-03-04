const static = require('koa-static');
const path = require('path')
const KoaCompose = require('koa-compose');
/**
 * 静态资源目录
 * facions图标
 * 静态资源目录
 */

module.exports = () => {
    const iconFile = static(path.resolve(__dirname, '../../../favicons'), { maxage: 25780000 })
    const staticDir = static(path.resolve(__dirname, '../../../client'), { maxage: 25780000 })
    return KoaCompose([iconFile, staticDir]);
};



