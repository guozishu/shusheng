const path = require("path");
const nunjucks = require("nunjucks");
const beautifyHTML = require("js-beautify").html;
/**
 * 渲染模版引擎
 * nunjucks 模版集合
 *
 */
module.exports = (options) => {
  const extname = "html";

  const viewPath = path.resolve(__dirname, "../views");
  const renderConfig = {};

  const nunjucksView = (viewPath, renderConfig) => {
    const env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(viewPath),
      renderConfig
    );
    return (view, data) => {
      return new Promise((resolve, reject) => {
        env.render(view, data, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    };
  };

  const render = nunjucksView(viewPath, renderConfig);

  const renderString = (pagePath, data) => {
    return render(pagePath, data).then((html) => {
      return beautifyHTML(html);
    });
  };

  const renderHtml = (ctx, pagePath, data, page) => {
   const pageRootPath = pagePath(page)
    return renderString(pageRootPath, data)
      .then((html) => {
        ctx.body = html;
        ctx.state.scope = null;
      })
      .catch(function (err) {
        throw err;
      });
  }

  return async (ctx, next) => {
    const routeList = ctx.state.controller;
    const pagePath = page => {
      return `../views/${routeList[0]}/${page}.${extname}`;
    }
    Object.defineProperties(ctx, {
      render: {
        get() {
          return renderHtml.bind(ctx, ctx, pagePath, ctx.state.scope)
        }
      },
      renderString: {
        get() {
          return page => {
            return renderString(pagePath(page), ctx.state.scope)
          }
        }
      }
    });
    // ctx.render = () => {
    //   return renderString(path.join(__dirname, pagePath), ctx.state.scope)
    //     .then((html) => {
    //       ctx.body = html;
    //       ctx.state.scope = null;
    //     })
    //     .catch(function (err) {
    //       throw err;
    //     });
    // };

    await next();
  };
};
