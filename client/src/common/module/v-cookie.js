const setCookie = function (name, value, expires, path, domain, secure) {
  var expires_date = new Date((new Date()).getTime() + (expires))
  document.cookie = name + '=' + encodeURIComponent(value) + ((expires) ? ';expires=' + expires_date.toGMTString() : '') + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '')
}
const getCookie = function (key) {
  var mat = new RegExp('(^|[^a-z])' + key + '=(.*?)(;|$)', 'i').exec(document.cookie)
  return mat ? decodeURIComponent(mat[2]) : ''
}

module.exports = {
  setCookie,
  getCookie
}
