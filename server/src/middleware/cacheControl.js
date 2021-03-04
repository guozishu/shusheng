/**
 * Cache-Control 通用消息头字段被用于在http请求和响应中通过指定指令来实现缓存机制。
 * public:表明响应可以被任何对象缓存
 * private:私有缓存
 * no-store:不使用任何缓存
 * no-cache:强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)
 * no-transform:不得对资源进行转换或转变
 * proxy-revalidate:与must-revalidate作用相同，但它仅适用于共享缓存（例如代理），并被私有缓存忽略。
 * must-revalidate:资源过期，在成功向原始服务器验证之前，缓存不能用该资源响应后续请求。
 * stale-if-error:如果新的检查失败，则客户愿意接受陈旧的响应。秒数值表示客户在初始到期后愿意接受陈旧响应的时间。
 * stale-while-revalidate:客户端愿意接受陈旧的响应，同时在后台异步检查新的响应。秒值指示客户愿意接受陈旧响应的时间长度。
 * max-age:设置缓存存储的最大周期
 * s-maxage:覆盖max-age或者Expires头，但是仅适用于共享缓存(比如各个代理)，私有缓存会忽略它。
 * min-fresh:客户端希望获取一个能在指定的秒数内保持其最新状态的响应。
 * max-stale:客户端愿意接收一个已经过期的资源。可以设置一个可选的秒数，表示响应不能已经过时超过该给定的时间。
 * 
 * 给页面做缓存处理
 */
module.exports = function (defaults) {
  return async function cacheControl(ctx, next) {

      var options = Object.assign({},ctx.cacheControl,defaults);
      var cacheControl = [];

      if (options.private) {
        cacheControl.push('private');
      } else if (options.public) {
        cacheControl.push('public');
      }

      if (options.noStore) {
        options.noCache = true;
        cacheControl.push('no-store');
      }

      if (options.noCache) {
        options.maxAge = 0;
        delete options.sMaxAge;
        cacheControl.push('no-cache');
      }

      if (options.noTransform) {
        cacheControl.push('no-transform');
      }

      if (options.proxyRevalidate) {
        cacheControl.push('proxy-revalidate');
      }

      if (options.mustRevalidate) {
        cacheControl.push('must-revalidate');
      } else if (!options.noCache) {
        if (options.staleIfError) {
          cacheControl.push(`stale-if-error=${options.staleIfError}`);
        }

        if (options.staleWhileRevalidate) {
          cacheControl.push(`stale-while-revalidate=${options.staleWhileRevalidate}`);
        }
      }

      if (Number.isInteger(options.maxAge)) {
        cacheControl.push(`max-age=${options.maxAge}`);
      }

      if (Number.isInteger(options.sMaxAge)) {
        cacheControl.push(`s-maxage=${options.sMaxAge}`);
      }
      
      let regExpFlag = false;
      if (options.regExp) {
        regExpFlag = options.regExp.test(ctx.url);
      }
      if (cacheControl.length && regExpFlag) {
        ctx.set('Cache-Control', cacheControl.join(','));
      }
      await next();
  }
}
