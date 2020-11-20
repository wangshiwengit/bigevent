$(function(){
    //登录注册跳转
$("#rega").on('click', function(){
    $('.logink').hide()
    $('.regk').show()
})
$("#logina").on('click', function(){
    $('.logink').show()
    $('.regk').hide()
})


//自定义规则 
var form = layui.form
form.verify({
    pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,

      qrpass: function(val){
          var pass =$('.regk [name=password]').val()
          if(pass !== value) {
              return '两次密码不一致'
          }

      }
})

$('#form_reg').on('submit', function(e){
    e.preventDefault()
    var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      }
      $.post('/api/reguser', data, function(res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
        $('#logina').click()
      })
    })

    
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
          url: '/api/login',
          method: 'POST',
          // 快速获取表单中的数据
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = '/index.html'
          }
        })
      })

})