// 设置路径（测试）
var baseURL = 'http://ajax.frontend.itheima.net'
// 设置路径（生产）
// var baseURL = 'http://www.itcast.cn'


// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // console.log(options);
    // console.log(option.url);
    options.url = baseURL + options.url
    // console.log(options);

    // 统一为有权限的接口，设置 headers 请求头
    // 注释：indexOf() 方法对大小写敏感！
    // 注释：如果要检索的字符串值没有出现，则该方法返回 - 1。---出现了则不等于-1
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂在 complete 回调函数
    options.complete = function (res) {
        // alert(111)
        // console.log(res);
        // 在complete 回调函数中 可以用 res.responseJSON 拿到服务器响应返回 的信息
        var data = res.responseJSON

        if (data.status === 1 && data.message === '身份认证失败！') {
            // 强制清空 token
            localStorage.removeItem('token')
            // 强制跳转到登录页面 
            location.href = '/login.html'
        }
    }



})