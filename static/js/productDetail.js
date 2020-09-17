$(document).ready(function () {
    //加的效果
    $(".add").click(function () {
        var n = $(this).prev().val();
        var num = parseInt(n) + 1;
        if (num == 0) { return; }
        else if (num > 99) { num = 99; }
        $(this).prev().val(num);
    });
    //减的效果
    $(".jian").click(function () {
        var n = $(this).next().val();
        var num = parseInt(n) - 1;
        if (num == 0) { return }
        else if (num < 0) { num = 0; }
        $(this).next().val(num);
    });
    var spfList = []
    var test =window.location.href;
    var shopId = test.split("?id=")[1];
    //渲染页面，获取商品详情数据
    function show_detail(){
        $.ajax({
            url: "http://192.168.0.107:8502/commodityDetails",
            type: "post",
            data:{"cmdId" : shopId},
            dataType: "json",
            success: function(data){
                $(".word_box_h1").text(data.cmdName)
                $(".word_box_evaluate  span:first").text(data.cmdCake)
                $(".word_box_evaluate  span:last").text(data.cmdScore)
                $(".price").text('¥'+data.cmdPrice)
                $('#cmaBrname').text(data.bjfCommodityDetails.cmaBrname);
                $('#cmaName').text(data.bjfCommodityDetails.cmaName);
                $('#cmaAddress').text(data.bjfCommodityDetails.cmaAddress);
                $('#cmaPhone').text(data.bjfCommodityDetails.cmaPhone);
                $('#cmaDay').text(data.bjfCommodityDetails.cmaDay);
                $('#cmaCadress').text(data.bjfCommodityDetails.cmaCadress);
                $('#cmaWeight').text(data.bjfCommodityDetails.cmaWeight);
                $('#cmaEnviro').text(data.bjfCommodityDetails.cmaEnviro);
                spfList = data.bjfSpfList
                let img = ''
                for(let k = 0;k < data.bjfCommodityDetails.cmaImage.split(',').length;k++){
                     img += '<li>'+
                               ' <a href="'+data.bjfCommodityDetails.cmaImage.split(",")[k]+'" title="信息">'+
                                '<img src="'+data.bjfCommodityDetails.cmaImage.split(",")[k]+'" alt="">'+
                                '</a>'+
                            '</li>'
                }
                $("#image").attr('src',data.bjfCommodityDetails.cmaImage.split(",")[0])
                $('#gallary').html(img)
                let img2= ''
                for(let a = 0;a < data.bjfCommodityDetails.cmaPicture.split(',').length;a++){
                     img2 +='<a href="'+data.bjfCommodityDetails.cmaPicture.split(",")[a]+'" title="信息">'+
                                '<img src="'+data.bjfCommodityDetails.cmaPicture.split(",")[a]+'" alt="">'+
                            '</a>'
                }
                $("#image_detail").html(img2)
                let str2 = data.bjfSpfList.length;
                let long = data.bjfSpfList[0].spfContent.split(',').length
                let str4 = new Array()
                for (let i = 0; i < long; i++) {
                    str4[i] = new Array()
                        for (let j = 0; j < str2; j++) {
                            let string = data.bjfSpfList[j].spfContent.substring(1, data.bjfSpfList[j].spfContent.length - 1);
                        str4[i][j] = string.split(',')[i]
                    }
                    str4[i] = Array.from(new Set(str4[i]))
                }
                let html = '';
                html += '<div class="every_type"> '
                for (k in str4) {
                    html += '<div class="one_type">'
                    for (k2 in str4[k]) {
                        html += '<a href="javascript:;" class="type"><span class="goods_attrli">' + str4[k][k2] + '</span></a>';
                    }
                    html += '</div>'
                }
                html += '</div>'
                $('#shopType').html(html);
            },
            error: function(){
                // alert("获取失败");
            }
        })
    }
    show_detail()
    //渲染页面，获取评论数据
    function show_comment(){
        $.ajax({
            url: "http://192.168.0.107:8501/showComments",
            type: "post",
            data:{"cmdId" : shopId},
            dataType: "json",
            success: function(data){
            var comment = ''
            for(let i = 0 ;i <data.length;i++){
                let first_img = ''
                let twice_img = ''
                let emback = ''
                if(data[i].eimage != null){
                    first_img = '<div style="margin-left: 100px;">'
                    for( let j = 0;j<data[i].eimage.split('#').length;j++){  
                        first_img += '<img src="'+data[i].eimage.split('#')[j]+'" alt="" class="comment_img">'               
                    }
                    first_img +=  '</div>'
                }//判断初次评论有没有图片
                let twice = ''
                if(data[i].euback != null){
                    if(data[i].ebackImages != null){
                        twice_img = '<div style="margin-left: 100px;">'
                        for( let j = 0;j<data[i].ebackImages.split('#').length;j++){  
                            twice_img += '<img src="'+data[i].ebackImages.split('#')[j]+'" alt="" class="comment_img">'               
                        }
                        twice_img +=  '</div>'
                    }//判断有没有追加图片
                    twice = '<div class="twice_comment">'+
                                '<label>买家追评：</label>'+
                                '<span>'+data[i].euback+'</span>'+
                                '<span style="float: right">'+data[i].ubackTime+'</span>'+
                                         twice_img +
                            '</div>'
                }//判断有没有追加评论
                if(data[i].emback !=null){
                    emback = '<div class="merchant_reply">商家回复('+data[i].mtime+')：<span>'+data[i].emback+'</span></div>'
                }
                comment += '<div class="comment_box">'+
                                '<img src="'+data[i].uheadSculpture+'" alt="" id="buyer_img">'+
                                '<div class="a">'+
                                '<div class="buyer_name">'+data[i].uaccount+'</div>'+
                                '<div class="first_comment">'+
                                '<label>初次评价：</label>'+
                                '<span>'+data[i].econtent+'</span>'+
                                '</div>'+
                                first_img +
                                twice +
                                emback+
                                '<div class="comment_time">'+data[i].utime+'</div>'+
                                '</div>'+
                            '</div>'
                
            }   
            $('#comment_group').html(comment);
            },
            error: function(){
                // alert("获取失败");
            }
        })
    }
    show_comment()
    //选择商品属性的点击事件
    setTimeout(function(){
        $('.goods_attrli').on("click", function () {
            if ($(this).hasClass('sel')) {
                $(this).removeClass('sel');
            } else {
                $(this).addClass('sel');
                $(this).parent().siblings().find(".goods_attrli").removeClass('sel');
            }
        })
    },500)
    //点击切换商品图片
    setTimeout(function(){
        //获取所有的a标签 
        var alA = document.getElementById("gallary").getElementsByTagName("a");/* $("#gallary a") */
        //循环遍历所有a标签
        for (var i = 0; i < alA.length; i++) {
            //为a设置点击事件
            alA[i].onclick = function () {
                //把a标签中的href 中存储的图片路径给需要展示图片的标签。
                document.getElementById("image").src = this.href;
                //把a标签中存储的title中存储的内容给需要展示的标签。
                //  document.getElementById("des").innerText=this.title;
                //阻止a链接的默认跳转。
                return false;
            }
        }
    },500)
    //立即购买按钮事件
    $('#buyNow').click(function(){
        console.log($('.num').val())
        window.top.location.href = '../onlineShopping/person.html?num='+ $('.num').val()
    })
    //加入购物车按钮事件
    $('#addCart').click(function(){    
            let selList = [];
            $(".sel").each(function(i,e){
                selList[i]= $(this).context.innerText;
            });
            let sel = selList.toString(selList)
            var spfId = ''
            for(let i = 0;i<spfList.length;i++){
                if(sel == spfList[i].spfContent.substring(1,spfList[i].spfContent.length-1))
                spfId = spfList[i].spfId
            }
            console.log(spfId)
            $.ajax({
                url: "http://192.168.0.117:8080/carts/add/to/cart",
                type: "post",
                data:{'spfId':spfId,'amount':$('.num').val(),'uid':100},
                dataType: "json",
                success: function(data){

                },
                error: function(){
                    // alert("获取失败");
                }
            })
    })
})