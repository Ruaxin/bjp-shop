//搜索页面显示商品
$(function(){
    //从游览器端的localstorage里取数据
    console.log((window.localStorage.getItem('product')))
    if ((window.localStorage.getItem('product') )==='[]'){
       alert("未搜索到任何商品");
       //跳转到前一个页面并且刷新
        window.location.href=document.referrer;
    }
    //转换成json的格式
    let Data=JSON.parse(window.localStorage.getItem('product'));

    let project = "";
    // 遍历改分类的json
    for (const a of Data) {
            let item= JSON.parse(a.sourceAsString)
            project += `<div class="product">
           <img src="${item.bjfCommodityDetails.cmaPicture}">
            <div class="text">
            <span class="textb">商品：${item.cmdName}</span>
            <br><span class="texta">价格：${item.cmdPrice}￥</span></div>
        </div>`;
            $(".middle").empty().append(project);
    }
})
