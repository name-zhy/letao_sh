$(function(){
    // 初始化滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,
    });

    // 初始化轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });
});


// function getSearch(){
//     var name,value;
//     var search=location.href;
//     var nums=search.indexOf("?");
//     search=search.substr(nums+1);
//     var arr=search.split('&');
//     for(i=0;i<arr.length;i++){
//         nums=arr[i].indexOf('=');
//         if(nums > 0){
//             name=arr[i].substring(0,nums);
//             value=arr[i].substr(nums+1);
//             this[name]=value;
//         }
//     }
// }; 当点击href为#的a标签时会拼接#号导致报错

function getSearch(key){
    console.log(location);
    var search = location.search;
    console.log(search);
    search=decodeURI(search);
    search=search.slice(1);
    var arr = search.split('&');

    var obj = {};
    arr.forEach(function(element, index){
        var k = element.split('=')[0];
        var v = element.split('=')[1];
        obj[k]=v;
    });
    return obj[key];
}