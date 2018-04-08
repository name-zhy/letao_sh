$(function(){
    var currentPage=1;
    var pageSize =5;

    runder();
    function runder(){
        $.ajax({
        url:'/category/querySecondCategoryPaging',
        type:'get',
        data:{
            page:currentPage,
            pageSize:pageSize,
        },
        success:function(info){
            console.log(info);
            $('.lt_content tbody').html(template('tmp',info));
            $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion:3,
                currentPage:currentPage,
                totalPages:Math.ceil(info.total/info.size),
                onPageClicked:function (a,b,c, page) {
                  
                  currentPage = page;
                  
                  runder();
                }
            })
        }
    })
    };

    $('#addBtn').click(function(){
        $('#secondModal').modal('show');

        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:1,
                pageSize:100,
            },
            success:function(info){
                console.log(info);
                $('.dropdown-menu').html(template('tsp',info));
            }
        })
    });
 
    $('.dropdown-menu').on('click','a',function(){
        var txt = $(this).text();
        var id = $(this).data('id');
        // console.log(txt);
        // console.log(id);
        $('#dropdownText').text(txt);
        $('[name="categoryId"]').val(id);
       
        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
        
    });

    $('#fileupload').fileupload({
        dataType:'json',
        done:function(e , data){
            console.log(data);
            var picAddr =data.result.picAddr;
            $('#imgBox img').attr("src",picAddr);
            $('[name="brandLogo"]').val(picAddr);
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });

    $('#form').bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields:{
              brandName:{
                  validators:{
                      notEmpty:{
                          message:"请输入二级分类名称"
                      }
                  }
              },
              categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传图片"
                    }
                }
            },
          }
    });

$('#form').on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
        url:'/category/addSecondCategory',
        type:'post',
        data:$('#form').serialize(),
        success:function(info){
            console.log(info);
            $('#secondModal').modal('hide');
            $('#form').data('bootstrapValidator').resetForm(true);
            currentPage=1;
            runder();
            $('#dropdownText').text('请选择1级分类');
            $('#imgBox img').attr("src","images/none.png");
        }
    })
})

    
})