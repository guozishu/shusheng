const KoaRouter = require("koa-router");
const KoaCompose = require("koa-compose");
const { loadFile } = require("../lib/utils/index.js");

const controllerCache = new Map();
const router = new KoaRouter();
/**
 * 路由中间件
 * @param {Array} routes 配置的路由列表
 */

module.exports = (routes) => {
  if (Array.isArray(routes)) {
    try {
      routes.forEach((route) => {
        const { method = "get", match, controller, middleware } = route;
        let args = [match];
        const routeList = controller.split(".");
        let classInstance;
        if (controllerCache.has(routeList[0])) {
          classInstance = controllerCache.get(routeList[0]);
        } else {
          const CClass = loadFile(`../../controllers/${routeList[0]}.js`);
          classInstance = new CClass();
          controllerCache.set(routeList[0], classInstance);
        }

        const classFunction = classInstance[routeList[1]];

        args.push((ctx, next) => {
          ctx.state.controller = routeList
          return next().then(() => {
            return classFunction.bind(ctx)(ctx.state.scope)
          });
        });

        if (typeof middleware === "function") {
          args.push(middleware);
        }
        router[method].apply(router, args);
      });
    } catch (ex) {
      console.error(`ROUTER ERROR ${ex}`);
    }
  }

  return KoaCompose([router.routes(), router.allowedMethods()]);
};
