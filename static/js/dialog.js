let data = [
  {'value': 100, 'time': '2020-10-10'},
  {'value': 20, 'time': '2020-10-01'},
  {'value': 5, 'time': '2021-01-10'},
  {'value': 100, 'time': '2020-10-10'},
  {'value': 20, 'time': '2020-10-01'},
  {'value': 5, 'time': '2021-01-10'},
]
$(function () {
  // $.ajax({
  //   url: 'http://192.168.0.77:8080/user/getUserCouPon',
  //   type: 'get',
  //   data: {'uId': 1},
  //   dataType: 'json',
  //   success: function (data) {
  //     console.log(111)
  //   },
  //   error: function () {
  //     layer.msg('获取失败')
  //   }
  // })
  let couponList = ``
  let getCouponList = () => {
    couponList = ``
    for (let i = 0; i < data.length; i++) {
      couponList +=
        `<div class="coupon">
         <div class="couponWrapper">
          <span class="couponValue">${data[i].value}元</span>
          <span class="couponTime">有效期:${data[i].time}</span>
         </div>
        <button class="couponBtn" data-index=${i}>
          <span>领</span>
          <span>取</span>
        </button>
    </div>`
    }
  }
  $('#couponDialog').click(function () {
      getCouponList()
      Swal.fire({
        title: '领取优惠券',
        html: `
          <div id="couponList">
          ${couponList}
          </div>
        `,
        width: 520,
        showCloseButton: true,
        confirmButtonText: '关闭',
      })
      $('.couponBtn').click(function (event) {
        const btn = event.currentTarget
        data.splice($(btn).data('index'), 1)
        Swal.fire({
          icon: 'success',
          title: '领取成功！',
          showConfirmButton: false,
          timer: 1000,
          width: 400,
        }).then(() => {
            $('#couponDialog').click()
          }
        )
        console.log('已领取')
      })
    }
  )
})

