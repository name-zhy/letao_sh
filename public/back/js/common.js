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



})