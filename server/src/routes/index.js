const home = require('./home');
const spa = require('./spa');
const menu = require('./menu');

module.exports = [
  {
    match: "/",
    controller: "index.blog"
  },
  {
    match: "/index1",
    controller: "index.index"
  },
  {
    match: "/index",
    controller: "index.guide"
  },
  {
    method: "get",
    match: "/home",
    controller: "index.home",
    middleware: (ctx, next) => { 
        console.log(`Multiple middleware ${ctx.url}`)
        return next();
    }
  },
  {
    method: "post",
    match: "/home",
    controller: "index.home"
  },
  {
    method: "post",
    match: "/login",
    controller: "index.login"
  },
  {
    method: 'post',
    match: '/pass',
    controller: "index.pass"
  },
  {
    method:'post',
    match:'/select',
    controller: 'index.select'
  },
  {
    method:'post',
    match:'/queryData',
    controller: 'index.queryData'
  }
].concat(home,spa,menu);
