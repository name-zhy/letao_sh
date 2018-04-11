$(function(){
    // 功能1: 渲染搜索历史记录
  // 1. 读取本地历史记录里面的数组
  // 2. 结合模板引擎渲染

    function getHistory(){
        var history = localStorage.getItem('search_list') || '[]';
        var arr= JSON.parse(history);
        return arr;
    };
// console.log(getHistory());
    
runder();
function runder(){
    var arr=getHistory();
    $('.lt_history').html(template('tmp',{ obj:arr }));
};

// 功能2: 删除功能, 删除本地历史记录数组里面一项
// 1. 给所有的删除按钮, 添加委托事件
// 2. 获取索引
// 3. 读取本地存储中的数组, 进行删除对应索引的那项
// 4. 同步到本地存储中
// 5. 页面也需要重新渲染
$('.lt_history').on('click' ,'.btn_delete' ,function(){
    var that=this;
    // console.log(index);
   mui.confirm('你确定要删除么？','温馨提示',['确认','取消'],function(e){
    if(e.index === 0){
        var index=$(that).data('index');
         var arr = getHistory();
         arr.splice(index,1);
         localStorage.setItem('search_list',JSON.stringify(arr));
         runder();
    }
   })
   
    // localStorage.setItem(arr);
    // runder();

});

// 功能3: 清空功能
  // 1. 注册事件(事件委托做)
  // 2. 清掉本地存储中的search_list
  // 3. 页面重新渲染
  $(".lt_history").on('click','.btn_empty',function(){
    mui.confirm('是否清楚所以历史记录','温馨提示',['确认','取消'],function(e){
        if(e.index === 0){
            localStorage.removeItem('search_list');
            runder();
        }
    })
  });

    // 功能4: 添加功能
  // 1. 点击搜索按钮, 获取输入框的值
  // 2. 获取数组
  // 3. 将输入框的值, 添加到数组中的最前面
  // 4. 持久化到本地存储中, 修改 search_list
  // 5. 重新渲染页面
  $('.li_search button').click(function(){
      var key=$('.li_search input').val().trim();
      if(key === ''){
          mui.toast('请输入搜索关键字',{duration:'500'});
          return;
      }
      var arr = getHistory();
      if(arr.length >=10){
          arr.pop();
      };
      if(arr.indexOf(key) != -1){
        arr.splice('key',1);
        
      }
      arr.unshift(key);
      localStorage.setItem('search_list',JSON.stringify(arr));
      runder();
      $('.li_search input').val('');

      location.href="searchList.html?key="+key;
  })


})