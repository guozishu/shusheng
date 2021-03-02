## koa-shusheng

构建 Koa2 framework 项目

<br>

### 快速开始

**项目依赖: [NodeJS > 10.0](https://nodejs.org/cn)**

1. 安装依赖: `yarn` 或 `npm i`。

2. 挂起服务：`yarn dev` 或 `npm dev`，访问 http://127.0.0.1:3000 示例。

&nbsp;&nbsp;**(可选)** 项目内置了 docker-compose

<br>

### 项目目录

```
├── client
│   ├── controllers         ---  控制器
│   ├── helpers             ---  帮助工具集 (拦截器、错误集、验证等)
│   ├── jobs                ---  任务 (定时任务、触发任务、邮件任务等)
│   ├── entities            ---  数据实体，数据库模型文件
│   └── services            ---  controller 与 model 的粘合层 (提拱一些实用方法...)
├── server
│   ├── config              ---  server配置
│   ├── lib                 ---  帮助工具类
│   ├── controllers         ---  控制器
│   ├── routes              ---  路由
│   └── views               ---  模板
├── test
│   ├── controllers         ---  控制器
│   ├── helpers             ---  帮助工具集 (拦截器、错误集、验证等)
│   ├── jobs                ---  任务 (定时任务、触发任务、邮件任务等)
│   ├── entities            ---  数据实体，数据库模型文件
│   └── services            ---  controller 与 model 的粘合层 (提拱一些实用方法...)
├── coverage
│   ├── environments        ---  环境配置
│   ├── koa.middlewares     ---  Koa 中间件配置
│   ├── routing.middlewares ---  Routing Controller 中间件配置
├── variables.env           ---  环境变量文件，如果在此文件设置将会覆盖 'config/environments'
```

<br>

### 中间件

开发一些通用中间件直接使用

* `路由` - 读取routes目录下的配置文件，根据array配置文件定位到对应的控制器
- routes - 目录
```
├── server
│   ├── src         ---  目录
│   │   ├── routes          ---  路由配置
│   │   ├── controller      ---  控制器函数
```

- routes - 配置，定位到controllers目录index.js内部类的index函数
  - method - 请求方法
  - match - 请求路径
  - controller - 匹配的控制器函数
  - middleware - 其他中间件
```
module.exports = [
  {
    method: 'get',
    match: "/index",
    controller: "index.index",
    middleware: (ctx, next) => {
      return next().then(() => {
        console.log('middleware')
      })
    }
  }
];
```

* `渲染` - 返回html或html字符串
- render.js - 渲染函数文件
```
├── server
│   ├── src         ---  目录
│   │   ├── middleware        ---  中间件
```

- render - 挂载渲染函数方法到koa - context对象下面，方便在控制器函数内部返回html，server端采用的是nunjucks模板。
  - method - 请求方法
  - match - 请求路径
  - controller - 匹配的控制器函数
  - middleware - 其他中间件
```
ctx.render = () => {
  this.body = 'html'
}
ctx.renderString = () => {
  return '<html></html>'
}
```

* `JSON` - 返回基于RESTful规范的json数据
- renderJson.js - 渲染函数文件
```
├── server
│   ├── src         ---  目录
│   │   ├── middleware        ---  中间件
```
- return json - 返回一个json数据
```
  ctx.renderJSON = ctx.renderJson = function (json) {
    this.body = JSON.stringify(json)
  }.bind(ctx)
```
 


<br>

### 特性

- 业务逻辑与配置分离，一目了然。

- scheme model 等同于 interface，更符合 TS 的代码风格。

- 依赖注入在 Koa 项目中的最佳实践。

- 测试与 Lint 脚手架。

- 使用 ncc 单文件部署。

- TypeScript hotload, 开发便捷。

<br>

### 生命周期参考

1. 调用 `app.ts` -> 准备环境变量 `environments` -> 获取环境文件 `variables.env`


<br>

### 数据库链接

你可以连接多个不同类型的数据 (如 `mysql` / `mongo` 等等)，每种数据库的配置信息也能再分为多个环境：

1. 应用将加载 `ormconfig.js` 文件作为默认的数据库连接配置信息。
2. 你还可以在文件夹 `configs/environments` 下指定不同环境的链接信息。
3. 你还可以在文件 `variables.env` 中指定 **私密或加密** 的链接信息，它们一般用于生产环境。也建议不要将 `variables.env` 文件加入版本控制。
4. 此外，你还是可以手动设置 `process.env` 覆盖以上所有。

<br>

### 关于环境变量

- **在开发环境中** (`NODE_ENV=development`)：自动从文件 `configs/environments/development.ts` 读取配置。

- **在生产环境中** (`NODE_ENV=production`): 自动从文件 `configs/environments/production.ts` 读取配置。

- **任何环境**: 如果 `variables.env` 文件内存在同名常量，会覆盖上述 2 个环境配置文件。优先级最高。

<br>

### 文档参考

- [koa](https://github.com/koajs/koa)
- [koa-router](https://github.com/ZijianHe/koa-router)

<br>



### LICENSE

[MIT](./LICENSE)
