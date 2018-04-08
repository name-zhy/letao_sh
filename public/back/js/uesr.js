$(function(){
    var currentPage=1;
    var pageSize =5;
    runder();
    function runder(){
        $.ajax({
        url:'/user/queryUser',
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        type:'get',
        dataType:'json',
        success:function(info){
            console.log(info);
            $('.table tbody').html(template('tmp',info));
            $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion:3,
            currentPage:currentPage,
            totalPages:Math.ceil(info.total/info.size),
            onPageClicked:function (a,b,c, page) {
            
            currentPage = page;
           
            runder();
            }
      });
        }

        })
    };


    $('.lt_content').on('click','.btn',function(){
        $('#uesrModal').modal('show');
       var id= $(this).parent().data("id");
       var isDelete=$(this).hasClass('btn-success')?1:0;

       $('#submitBtn').off('click').on('click',function(){
           $.ajax({
               type:'post',
               url:'/user/updateUser',
               data:{
                id:id,
                isDelete:isDelete
               },
               success:function(info){
                   console.log(info);
                   if(info.success){
                    $('#uesrModal').modal('hide');
                   
                    runder();
                   }
               }
           })
       })
    })


   
    
})