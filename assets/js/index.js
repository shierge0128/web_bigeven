$(function () {
    var layer = layui.layer
    getUserInfo()
    // 退出提示框
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            location.href = './login.html'
            // 清空token
            localStorage.removeItem('token')
            layer.close(index);
        });

    })
})
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg('获取信息失败！');
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     // console.log(res.responseJSON);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //do something
        //         location.href = './login.html'
        //         // 清空token
        //         localStorage.removeItem('token')
        //     }
        // }
    })
}
function renderAvatar(user) {
    // 设置欢迎文本
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需求渲染用户的头像
    if (user.user_pic !== null) {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    }
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
}
// 自己定义的退出按钮
// function clickTuiChu() {
//     $('.tuichu').on('click', function () {
//         setTimeout(function () {
//             location.href = './login.html'
//         }, 200);

//     })
// }