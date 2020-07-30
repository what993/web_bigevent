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
})