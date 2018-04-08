$(function(){
    var currentPage=1;
    var pageSize =5;
    runder();
    function runder(){
         $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success:function(info){
            console.log(info);
            $('.lt_content tbody').html(template('tmp',info));

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



    $('#addBtn').click(function(){
        $('#firstModal').modal('show');
    });
   
    $('#form').bootstrapValidator({
         // 配置图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },

      fields:{
        categoryName:{
              validators:{
                  notEmpty:{
                      message:'请输入一级分类'
                  }
              }
          }
      }

    });

    $("#form").on('success.form.bv',function(){
        // console.log($("#form").serialize());
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data: $("#form").serialize(),
            success:function(info){
                console.log(info); 
                if(info.success){
                    $('#firstModal').modal('hide');
                    currentPage=1;
                    runder();
                    console.log($('#form').data("bootstrapValidator"));
                    $('#form').data("bootstrapValidator").resetForm(true);
                }
            }
        })
    })


})