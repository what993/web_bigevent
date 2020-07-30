// 入口函数
$(function () {
    // 1、点击按钮，切换登录和注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 2、定义 layui 表单验证规则
    // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
    // 通过 form.verify() 函数定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            // var pwd = $('.reg-box [name=password]').val()   //方法一
            var pwd = $('#reg-pwd').val()     //方法二 ： 用 id 选择器
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 3\监听注册表单的提交事件      ------------注册功能
    $('#form_reg').on('submit', function (e) {
        // 阻止默认的提交行为
        e.preventDefault()
        //注册详情信息
        // console.log($('#form_reg').serialize());
        // 发起Ajax的post请求
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },                                      //方法一
            // data: $('#form_reg').serialize(),    //方法二  
            success: function (res) {
                // 注册失败校验
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 注册成功，提示
                layer.msg(res.message)
                // 模拟人的点击效果 触动“去登录”
                $('#link_login').click()
                // 清空表单
                $('#form_reg')[0].reset()

            }
        })
    })

    // 4\监听登录表单的提交事件     -------------登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登陆成功！')
                // console.log(res.token);   
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转后台主页
                location.href = '/index.html'
            }
        })
    })


})