$(function(){
    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        success:function(info){
            console.log(info);
            $('.category_left ul').html(template('tmp',info));
            runder(info.rows[0].id);
        }
    });

    $('.category_left ul').on('click','a',function(){
        var id=$(this).data('id');
        runder(id);
    });


    function runder(id){
        $.ajax({
            url:'/category/querySecondCategory',
            data:{
                id:id,
            },
            type:'get',
            success:function(info){
                console.log(info);
                $('.category_right ul').html(template('tsp' ,info));
                $('.category_right ul').append(template('tep' ,info));
            }
        })
    }

})