$(function () {
  let couponList = ``
  // let id = $.cookie('userId')
  let id = 1
  let isErrorNum = 1
  let isDialog = true
  // 获取优惠券列表
  const getCouponList = () => {
    $.ajax({
      url: 'http://192.168.0.118:8080/couPon/showAll',
      type: 'post',
      data: {'id': id},
      dataType: 'json',
      success: function (data) {
        isDialog = true
        couponList = ``
        if (data.length === 0) {
          couponList = `<img class="noCoupon" alt="没有优惠券" src="../../static/images/noCoupon.png"/>`
        }
        for (let i = 0; i < data.length; i++) {
          couponList +=
            `<div class="coupon">
              <div class="couponWrapper">
                <span class="couponValue">${data[i].mdiscp.mdpName}</span>
                <span class="couponTime">有效期:${data[i].endTime}</span>
              </div>
               <button class="couponBtn" data-index=${data[i].mdiscp.mdpId}>
                 <span>领</span>
                 <span>取</span>
               </button>
            </div>`
        }
      },
      error: function () {
        if (isErrorNum !== 1) {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'aa网络出错了',
            width: 400,
            showConfirmButton: false,
            timer: 1500
          })
        }
        isErrorNum++
        isDialog = false
      }
    })
  }
  // 领取
  const takeCoupon = (index) => {
    $.ajax({
      url: 'http://192.168.0.118:8080/couPon/getCouPon',
      type: 'post',
      data: {
        'mdpId': index,
        'uid': id
      },
      dataType: 'json',
      success: function (data) {
        console.log(data)
        getCouponList()
      },
      error: function () {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: '网络出错了',
          width: 400,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  //初始化
  getCouponList()
  $('#couponDialog').click(function () {
      console.log(isDialog)
      if (!isDialog) {
        console.log(!id)
        if (!id) {
          Swal.fire({
            position: 'top',
            icon: 'warning',
            title: '请先登录',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            getCouponList()
          })
        } else {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'ff网络出错了',
            width: 400,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            getCouponList()
          })
        }
      } else {
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
          takeCoupon($(btn).data('index'))
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
    }
  )
})

