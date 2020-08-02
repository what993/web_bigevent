$(function () {
    // 定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.trim().length > 6) {
                return "昵称长度必须在 1 ~ 6 个字符之间！"
            }
        }
    })
    // 调用
    initUserInfo()

    // 初始化用户的基本信息
    function initUserInfo() {
        // 发送ajax
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                // 调用form.val() 快速为表单赋值
                var obj = res.data
                form.val('formUserInfo', obj)
            }
        })
    }


    // 重置表单的数据（只接受click事件的绑定）
    $('#btnReset').on('click', function (e) {
        // 取消浏览器的默认重置操作行为（取消清空表单功能）
        e.preventDefault()

        initUserInfo()
    })


    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起ajax
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                // 失败校验
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败！')
                }

                layer.msg('恭喜您，信息修改成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
                // $('.layui-form')[0].reset()

            }
        })
    })

})