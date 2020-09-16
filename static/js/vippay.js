//获取会员套餐
$(function () {
    // var data = [{
    //     num: "1",
    //     price: "199",
    //     time: "年",
    // }, {
    //     num: "3",
    //     price: "49",
    //     time: "月",
    // },
    //     {
    //         num: "1",
    //         price: "20",
    //         time: "月",
    //     }];
    //
    // //json地址的值
    //
    // // url: "/homePage/shouzhan",
    // // type: "GET",
    // // datatype: "json",
    // function name(data) {
    //     console.log(data);
    //     let project = "";
    //     //循环遍历data的值
    //     for (var i = 0; i < data.length; i++) {
    //         //project存储遍历的值 data-id一种传参方式
    //         project = `<div class="pay-box" data-id="${i + 1}" id="pay${i}">
    //                             <h3>商城${data[i].num}${data[i].time}VIP</h3>
    //                             <div class="pay-box-price">
    //                                 <span class="price">${data[i].price}</span>
    //                                 <span class="time">元/${data[i].time}</span>
    //                             </div>`;
    //         //字符串拼接追加到div中
    //         $(".pay").append(project);
    //     }
    //     //点击获取商品id传值给商品详情页
    //
    // }
    // name(data);
        $.ajax({
            url: "http://192.168.0.120:8989/bjfMemberPay",
            type: "GET",
            datatype: "json",
            success: function (data) {
                console.log(data);
                let project = "";
                //循环遍历data的值
                for (var i = 0; i < data.length; i++) {
                    //project存储遍历的值 data-id一种传参方式
                    project = `<div class="pay-box" data-id="${i + 1}" id="pay${i}">
                                            <h3>商城${data[i].mbpMonth}月VIP</h3>
                                            <div class="pay-box-price">
                                                <span class="price">${data[i].mbpMoney}</span>
                                                <span class="time">元/${data[i].mbpMonth}月</span>
                                            </div>`;
                    //字符串拼接追加到div中
                    $(".pay").append(project);
                }
                let num =1;
                $("#pay0").toggleClass("charge-click");
                $(".pay-box").click(function (event) {
                    $(".pay-box").removeClass("charge-click");
                    $(this).toggleClass("charge-click");
                    //获取套餐的id
                    num = event.currentTarget.getAttribute("data-id");
                });
                // 选中支付套餐框
                // 点击支付跳转到支付页面
                $(".submit").click(function () {
                    console.log(num);
                    $.ajax({
                        url: "http://192.168.0.120:8989/vipPay",
                        type: "GET",
                        data: {"mbpId":num,"UId":1},
                        success: function (data) {
                           alert("success")
                        }
                    })
                });
            }
        })


});
// 选中支付套餐框
$(function () {


});
