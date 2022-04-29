$(function () {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()
    // 定义获取文章分类列表函数
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var str = template('tpl-table', res)
                $('tbody').html(str)
            }
        })
    }

    var indexAdd = null
    // 添加文章分类按钮弹出层
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    // 添加文章分类按钮功能
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败！')
                }
                initArtCateList()
                layer.msg('新增文章分类成功！')
                layer.close(indexAdd)
            }
        })
    })

    // 编辑按钮弹出层
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        // console.log(id);
        // 调用根据 Id 获取文章分类数据接口
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)

            }
        })
    })
    // 编辑按钮功能
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类信息失败！')
                }
                initArtCateList()
                layer.msg('更新分类信息成功！')
                layer.close(indexEdit)

            }
        })
    })
    // 删除按钮弹出层
    $('tbody').on('click', '.btn-del', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // console.log('ok');

            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败！')
                    }

                    layer.msg('删除文章分类成功！')
                    layer.close(indexEdit)
                    initArtCateList()
                }
            })
            layer.close(index);
        });
    })
})