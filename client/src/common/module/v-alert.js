/*
{
    title: 主标题
    subtitle: 副标题
    btnInfo:{
        cancel:["取消",function(){}],         //cancel按钮的名称和自定义的方法
        ok:["确定",function(){}]                //ok按钮的名称和自定义的方法
    }
    multi: false // 为true弹出多个，否则单例
}
*/
v.alert = function (opts) {
  if (typeof opts !== 'object') {
    return false
  }
  var alertHtml = '<div class="sweet-overlay"></div><div class="sweet-alert">\
        <div class="sa-input-error"><img src="//n1image.hjfile.cn/zhuanti/2017/08/30/7086975213486b8dcbd3f6d9fd2831a8.png" alt=""></div>\
        <h2 style="display:' + (opts.title && opts.title.length > 0 ? 'block' : 'none') + '">' + opts.title + '</h2>\
        <p style="display:' + (opts.subtitle && opts.subtitle.length > 0 ? 'block' : 'none') + '">' + opts.subtitle + '</p>\
        <div class="sa-button-container">\
        <button class="cancel" style="display:' + (opts.btnInfo && opts.btnInfo.cancel ? 'inline-block' : 'none') + '">' + (opts.btnInfo && opts.btnInfo.cancel ? opts.btnInfo.cancel[0] : '取消') + '</button>\
        <div class="sa-confirm-button-container">\
            <button class="confirm">' + (opts.btnInfo && opts.btnInfo.ok ? opts.btnInfo.ok[0] : '确定') + '</button>\
        </div>\
        </div>\
    </div>'
  if (!opts.multi) {
    v.alertok()
  }

  var hideAlert = function () {
    rootAlertObj.remove()
    if ($('.sweet-alert').length == 0) {
      $('.sweet-overlay').remove()
    }
  }
  var rootAlertObj = $(alertHtml)
  var cancelFun = hideAlert
  var okFun = hideAlert
  if (opts.btnInfo && opts.btnInfo.cancel && typeof opts.btnInfo.cancel[1] === 'function') {
    cancelFun = function () {
      opts.btnInfo.cancel[1]()
      hideAlert()
    }
  }
  if (opts.btnInfo && opts.btnInfo.ok && typeof opts.btnInfo.ok[1] === 'function') {
    okFun = function () {
      opts.btnInfo.ok[1]()
      hideAlert()
    }
  }
  rootAlertObj.find('.cancel').on('click', cancelFun)
  rootAlertObj.find('.confirm').on('click', okFun)
  rootAlertObj.find('.sa-input-error').on('click', hideAlert)
  $(document.body).append(rootAlertObj)
}
v.alertok = function () {
  $('.sweet-overlay,.sweet-alert').remove()
}
