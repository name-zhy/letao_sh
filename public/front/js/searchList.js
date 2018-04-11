$(function(){
    var key = getSearch('key');
    console.log(key);
    $('.li_search input').val(key);

    runder();
     // 功能2: 点击搜索按钮, 实现搜索功能
     $('.li_search botton').click(function(){
        var key= $('.li_search input').val();
        var history = localStorage.getItem('search_list') || '[]';
        var arr =JSON.parse(history);
        var index=arr.indexOf(key);
        if(index != -1){
            arr.splice(index,1);
        };
        if(arr.length > 10){
            arr.pop();
        };
        arr.unshift(key);
        localStorage.setItem('search_list',JSON.stringify(arr));

     });
// 功能3: 点击排序按钮, 进行排序
  // 1. 如果没有 current 类, 自己加上 current 类, 其他去掉 current类
  // 2. 如果有 current 类, 直接切换 i 里面的上下箭头
  $('.lt_sort a[data-type]').click(function(){
      if($(this).hasClass('current')){
         $(this).find('i').toggleClass("fa-angle-down").toggleClass('fa-angle-up')
      }else{
           $(this).addClass('current').siblings().removeClass('current');
           $('.lt_sort a').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
      }
      runder();
  })


     function runder(){
        $('.lt_product').html('<div class="loading"></div>');

         var params={};
         params.proName=$('.li_search input').val();
         params.page=1;
         params.pageSize=100;
        //  console.log(params);
        var $current=$('.lt_sort .current');
         if($current.length > 0){
             var sortName=$current.data('type');
             var sortValue = $current.find('i').hasClass('fa-angle-down')?2:1;
             params[ sortName ] = sortValue
         }
         setTimeout(function(){
            $.ajax({
                        url:'/product/queryProduct',
                        type:'get',
                        data:params,
                        success:function(info){
                            console.log(info);
                            $('.lt_product').html(template('tmp',info));

                        }

                    })
         },500)
        
     }


})