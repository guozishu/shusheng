/*
{
    content: 内容,
    mask:是否显示透明蒙层，防止触摸穿透，默认：false
    time:显示时间    非必须，不传就是手动点击遮罩隐藏 ********毫秒**********
    callback:点击遮罩回调函数
}
*/
v.showToast = function (opts) {
  if (typeof opts !== 'object') {
    return false
  }
  var toastHtml = '<div class="toast">' + (opts.mask ? '<div class="sweet-overlay mask-hide"></div>' : '') + '\
        <div class="sweet-toast">\
        <div class="content">\
        <p style="display:' + (opts.content && opts.content.length > 0 ? 'block' : 'none') + '">' + opts.content + '</p>\
        </div>\
    </div></div>'

  var hideToast = function () {
    rootToastObj.remove()
    if ($('.sweet-toast').length == 0) {
      $('.sweet-overlay').remove()
    }
    if (typeof opts.callback === 'function') {
      opts.callback()
    }
  }

  var rootToastObj = $(toastHtml)
  if ($('body .toast').length > 0) {
    $('body .toast').remove()
  }

  $('body').append(rootToastObj)
  rootToastObj.find('.sweet-overlay').on('click', hideToast)

  if (typeof opts.time === 'number') {
    setTimeout(function () {
      hideToast()
    }, opts.time)
  }
}
