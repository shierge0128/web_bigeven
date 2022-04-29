$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    //定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (data) {
        const dt = new Date(data)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())


        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())


        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    //定义补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    //定义一个对象，将来发送到服务器
    var q = {
        pagenum: 1,     //页码值
        pagesize: 2,    //每页显示多少条数据
        cate_id: '',    //文章分类的 Id
        state: ''       //文章的状态，可选值有：已发布、草稿
    }
    initTable()
    initCate()
    //获取文章的列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // layer.msg('获取文章列表成功！')
                // console.log(res);
                var str = template('tpl-table', res)
                $('tbody').html(str)
                renderPage(res.total)
            }
        })
    }
    //初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败！')
                }
                // layer.msg('获取文章分类列表成功！')
                // console.log(res);
                var str = template('tpl-cate', res)
                // console.log(str);
                $('[name = cate_id]').html(str)
                form.render()
            }
        })
    }

    //为筛选表单绑定submit事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    //定义渲染分页的方法
    function renderPage(total) {
        // console.log(total);
        //调用laypage.render()方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox',//分页容器的ID
            count: total, //总数据条数
            limit: q.pagesize, //每页显示几条数据
            curr: q.pagenum, //设置默认被选中的分页
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],//自定义排版
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    initTable()
                }
            }
        })
    }
    //为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        var len = $('.btn-delete').length
        // console.log(len);
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index);
        });

    })

    //为编辑按钮绑定点击事件
    $('tbody').on('click', '.btn-bj', function () {
        // console.log(len);
        var id = $(this).attr('data-id')
        location.href = "./art_change.html?value=" + id;
        // location.href = './art_change.html'
        // console.log(id);location.href="./art_change.html?value="+d;
        // // console.log('123');
        // $.ajax({
        //     method: 'GET',
        //     url: '/my/article/' + id,
        //     success: function (res) {
        //         // console.log(res);
        //         if (res.status !== 0) {
        //             return layer.msg('获取文章失败！')
        //         }
        //         layer.msg('获取文章成功！')
        //         location.href = './art_change.html'
        //     }
        // })


    })
})