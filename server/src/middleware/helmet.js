const helmet = require('koa-helmet')
/**
 * koa-helmet
 * 通过设置 Http 头来使应用程序更加安全
 * Content-Security-Policy : 内容安全策略 
 * X-DNS-Prefetch-Control : 控制着浏览器的 DNS 预读取功能。 
 * Expect-CT : 允许站点选择性报告和/或执行证书透明度 (Certificate Transparency) 
 * Feature-Policy : 标头提供了一种机制
 * X-Frame-Options : 用来给浏览器指示允许一个页面可否在frame
 * X-Powered-By : 表明用于支持当前网页应用程序的技术
 * Public-Key-Pins : 是一种安全功能
 * Strict-Transport-Security : 是一个安全功能
 * X-Download-Options : 设置 noopen 为阻止 IE8 以上的用户在您的站点上下文中执行下载
 * Cache-Control : 通用消息头字段被用于在http 请求和响应中通过指定指令来实现缓存机制。
 * Pragma : 是一个在 HTTP/1.0 中规定的通用首部
 * Expires : 响应头包含日期/时间， 即在此时候之后，响应过期。
 * Surrogate-Control : 通过检查来自源服务器的响应中的缓存头来确定要缓存的内容。
 * X-Content-Type-Options : 被服务器用来提示客户端一定要遵循在 Content-Type 首部中对 MIME 类型 的设定，而不能对其进行修改。
 * X-Permitted-Cross-Domain-Policies : 为Web客户端提供了跨域处理数据的权限 
 * Referrer-Policy : 首部用来监管哪些访问来源信息，
 * X-XSS-Protection : 当检测到跨站脚本攻击 (XSS)
 */
module.exports = () => {
  return helmet()
}
