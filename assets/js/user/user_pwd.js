$(function () {
  var form = layui.form
  var layer = layui.layer
  // 自定义密码校验规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    newPwd: function (value) {
      var a = $('.layui-card-body [name=oldPwd]').val()
      if (a === value) {
        return '新密码与原密码一致'
      }
    },
    rePwd: function (value) {
      var b = $('.layui-card-body [name=newPwd]').val()
      if (b !== value) {
        return '两次密码不一致'
      }
    }
  })
  // 向服务器发起重置密码请求
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('重置密码失败！')
        }
        // console.log(res);
        layer.msg('重置密码成功！')
        // 刷新重置密码
        $('.layui-form')[0].reset()
      }
    })
  })

})