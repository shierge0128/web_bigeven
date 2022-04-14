$(function () {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    nickname: function (vaule) {
      if (vaule.length > 6) {
        return '昵称必须6个字符'
      }
    }
  })
  initUserInfo()




  // 初始化用户信息
  function initUserInfo() {
    $.ajax({
      method: 'get',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        console.log(res);
        form.val('formUserInfo', res.data);
      }
    })
  }
  // 重置表单的信息
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })
  // 监听表单的提交
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        // console.log(res);
        layer.msg('更新用户信息成功！')
        // 调用父页面的方法，重新渲染头像和用户名
        window.parent.getUserInfo()
      }
    })
  })
})