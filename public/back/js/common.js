

NProgress.configure({showSpinner:false});
$(document).ajaxStart(function(){
    NProgress.start();
});
$(document).ajaxStart(function(){
    setTimeout(function(){
        NProgress.done();
    },500)
});

if(location.href.indexOf('login.html') === -1){
    $.ajax({
        url:'/employee/checkRootLogin',
        type:'get',
        dataType:'json',
        success:function(info){
            console.log(info);
            if(info.success){

            }
            if(info.error == 400){
                location.href = 'login.html';
            }
        }
    })
}


$(function(){
    


    $('.category').click(function(){
        $(this).next().stop().slideToggle();
    });

    $('.icon_menu').click(function(){
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
    })


    $('.icon_logout').click(function(){
        $('#logoutModal').modal('show')
    })

    $("#logoutBtn").click(function(){
        $.ajax({
            type:"GET",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                if(info.success){
                    location.href="login.html";
                }
            }
        })
    })


    
})