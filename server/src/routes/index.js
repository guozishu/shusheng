module.exports = [
  {
    match: "/",
    controller: "index.blog"
  },
  {
    match: "/face",
    controller: "index.entry"
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
  }
];
