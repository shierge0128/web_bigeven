$.ajaxPrefilter(function (opt) {
    // 统一请求的根路径
    opt.url = 'http://www.liulongbin.top:3007' + opt.url
    // console.log(opt.url);
    // 统一headers请求头
    if (opt.url.indexOf('/my/') !== -1) {
        opt.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    opt.complete = function (res) {
        // console.log(res.responseJSON);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //do something
            location.href = './login.html'
            // 清空token
            localStorage.removeItem('token')
        }
    }
})