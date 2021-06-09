/*
    例子 : https://mc.hujiang.com?a=1&b=2&c=3
*/
let getQueryStringArgs = function () {
  if (!location.search) return {}
  var qs = location.search.substring(1).split('&')
  var args = {}
  for (var i = 0; i < qs.length; i++) {
    var idx = qs[i].indexOf('=')
    var name = qs[i].substr(0, idx)
    var val = qs[i].substr(idx + 1)
    args[name] = decodeURIComponent(val)
  }
  return args
}

/*
    说明 : https://mc.hujiang.com/{ classid }/{ productid }/{ pointid }
    例子 : https://mc.hujiang.com/1345334/1/3
*/
let getUrlStrArgs = function (num) {
  return location.pathname.split('/').slice(-num)
}

export {
  getQueryStringArgs,
  getUrlStrArgs
} 