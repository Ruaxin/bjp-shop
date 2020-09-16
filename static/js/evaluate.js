$(function(){
    // 取值
    let uId = 12;
    let oiStatus = window.location.href.split("=")[1];
    let cmdId = window.location.href.split("=")[2];
    let oiImage = window.localStorage.getItem('oiImage');
    let oiName = window.localStorage.getItem('oiName');
    let odDelid = window.localStorage.getItem('odDelid');
    // 赋值
    $('.cmdId').val(cmdId);
    $('.uId').val(uId);
    $('.odDelid').val(odDelid);
    //商品名称和图片
    $('.item-box').children().eq(0).attr("src",oiImage);
    $('.item-box').children().eq(1).text(oiName);
    //未评价
    if(oiStatus === '3'){
        $('.initial-box').hide();
        $('.text-content').attr("name",'eContent');
        $('.evaluate-Img').attr("name",'eImage');
        $('.from-action').attr('action','http://192.168.0.107:8989/toBeEvaluated');
    }else if(oiStatus === '4'){    //追加评价
        $('.initial-box').show();
        $('.choose-evaluate').hide();
        $('.text-content').attr("name",'eUback');
        $('.evaluate-Img').attr("name",'eBackImages');
        //初次评论数据请求
        $.ajax({
            url: "http://192.168.0.107:8989/additionalComments",
            type: "GET",
            datatype: "json",
            data:{
                "cmdId": cmdId,
                "uId": uId },
            success: function (data) {
                console.log(data)
                $(".comment-first").text(data.econtent);
                $(".merchant").text(data.emback);

                let dataImg=data.eimage.split("#");
                evaluateImg(dataImg);
            }
        });

        $('.from-action').attr('action','http://192.168.0.107:8989/additionalCommentsSubmit');
    }

    function evaluateImg(evaluateData){
        let str = '';
        for(let j = 0;j < evaluateData.length; j++){
            str += `<img src=${evaluateData[j]} alt="">`
        };
        $('.initial-img-box').html(str);
    }


    // 退款退货框上传图片
    let num = 0;
    $("#image").click(function(){
        $("#uploadfile").click();
    });
    $("#uploadfile").change(function(){
        let files = this.files;    //获取文件信息

        if(files.length<4){
            $.each(files,function(key,value){
                //每次都只会遍历一个图片数据
                let reader = new FileReader();  //调用FileReader
                reader.onload = function(evt){   //读取操作完成时触发。
                    if(num<3){
                        $("#image").before('<img src="" style="width:50px;height:50px;margin-right:6px;"/>').
                        siblings().eq(num).attr('src',evt.target.result);
                        num++;
                    };
                    if(num == 3){
                        $('#image').hide()
                    }
                }
                reader.readAsDataURL(value); //将文件读取为 DataURL(base64)
            })
        }else{
            alert("最多上传三张图片,请选择的图片不要大于四张！");
        }
    });

    // let num = 0;
    // $("#image").click(function(){
    //     $("#uploadfile").click();
    // });
    // $("#uploadfile").change(function(){
    //     let files=$(this)[0].files[0];    //获取文件信息

    //     if(files){
    //         let reader=new FileReader();  //调用FileReader
    //         reader.onload=function(evt){   //读取操作完成时触发。
    //             if(num<3){
    //                 $("#image").before('<img src="" style="width:50px;height:50px;margin-right:6px;"/>').
    //                 siblings().eq(num).attr('src',evt.target.result);
    //                 num++;
    //             };
    //             if(num == 3){
    //                 $('#image').hide()
    //             }
    //         }
    //         reader.readAsDataURL(files); //将文件读取为 DataURL(base64)
    //     }else{
    //         alert("上传失败");
    //     }
    // });

    // 提交退款理由和照片
    $('.submit-btn').click(function(){
        layer.confirm('确认提交吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            $('#refund-form').ajaxSubmit(function(data){
                console.log(data)
                if(data == 'success'){
                    layer.msg('提交成功', {icon: 1});
                    window.history.back();
                }else{
                    layer.msg('提交失败,评论包含敏感字符,请注意文明', {icon: 5});
                }
            });
        });
    })



})
