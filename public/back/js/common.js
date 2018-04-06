$(function(){
    NProgress.configure({showSpinner:false});
    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStart(function(){
        setTimeout(function(){
            NProgress.done();
        },500)
    })


    $('.category').click(function(){
        $(this).next().slideToggle();
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