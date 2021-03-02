module.exports = [
  {
    match: "/",
    controller: "index.index"
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
