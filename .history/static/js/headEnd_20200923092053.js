$(function(){
    console.log($.cookie('userId'))

    if ($.cookie('userId') !== undefined) {
      $('.go_login').empty()
      console.log('用户已登录')
      $('#person').click(function () {
        window.location.href = '../templates/person.html'
      });
      // 跳转我的订单页yz
      $('#order').click(function(){
        window.location.href='../templates/indent.html'
      })
    } else {
      console.log('用户未登录')
      $('.exit_login').empty()
      $('.rightText').click(function () {
        window.location.href = '../templates/Login.html'
      })
    }
    //退出登录
    $('.exit_login').click(function () {
      $.cookie('userId', '', {expires: -1})
      window.location.href = '../templates/Login.html'
    })
 
  
  // 商品搜索
  function ajax() {
    $.get({
      url: 'http://192.168.0.123:8080/demo/commodity/elasticsearch',
      data: {'key': $('.search-text').val()},
      xhrFields: {
        'Access-Control-Allow-Origin': '*',
      },
  
      success: function (data) {
        console.log('data：' + JSON.stringify(data))
        //储存到游览器端localstorage
        window.localStorage.setItem('product', JSON.stringify(data))
      }
    })
  }
  
  //点击搜索跳转到商品搜索页面
  $(function () {
    $('#btn1').click(function () {
      if ($('.search-text').val() == '') {
        alert('搜索内容不可为空')
      } else {
        // 给超链接添加地址
        $('#checka').attr('href', '../templates/SearchProduct.html')
        // 超链接同时触发点击事件
        $('#checka')[0].click()
      }
    })
  })
  
})