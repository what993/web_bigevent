$(function () {

    // 获取用户的基本信息
    getUserInfo()

    var layer = layui.layer
    // 点击按钮-实现退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {

            // 清除本地存储的token
            localStorage.removeItem('token')
            // 跳转登录页面
            location.href = '/login.html'

            // 关闭 询问框
            layer.close(index);
        });
    })







})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // jquery中的ajax 专门用来设置请求头信息的属性
        // headers 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // token 可能24小时就失效了，所以需要重新登录
            // console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }

            // 调用 渲染用户头像
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     console.log(res);
        //     // 在complete 回调函数中 可以用 res.responseJSON 拿到服务器响应返回 的信息
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败') {
        //         // 强制清空 token
        //         localStorage.removeItem('token')
        //         // 强制跳转到登录页面 
        //         location.href = '/login.html'
        //     }
        // }


    })
}


// 封装用户渲染用户头像
function renderAvatar(user) {
    // 获取用户名
    var name = user.nickname || user.username
    // 欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}