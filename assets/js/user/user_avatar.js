$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var layer = layui.layer
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    // 替换头像为选择的图片
    $('#file').on('change', function (e) {
        // console.log(e);
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择图片')
        }
        // 成功选择文件后执行
        // 1.拿到用户选择的文件
        var file = e.target.files[0]
        // 2.根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        // 3.先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)
    })
    // 调用替换头像接口
    $('#btnUpload').on('click', function () {
        // 将裁剪后的图片，输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        // console.log(dataURL);
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')
                window.parent.getUserInfo()
            }
        })
    })
})



