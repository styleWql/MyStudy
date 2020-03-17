$('document').ready(function () {
    $(".nav_box a").each(function () {
        $this = $(this);
        if (this.href == window.location.href) {
            $this.addClass("red");
        }
    });
});

$('#listbox').on('click', '.btn-id', function () {
    // console.log($('.btn-id'));
    sessionStorage.id = $(this).attr('id')
    console.log(sessionStorage.id);
    
})
//登陆对象
let userName=''
let headImg_str=''
if(sessionStorage.userInfo){
var userInfo= JSON.parse(sessionStorage.userInfo)

userName=userInfo.t_user
if(sessionStorage.head_str){
    headImg_str=sessionStorage.head_str
}else{
    // console.log(JSON.parse(sessionStorage.userInfo).t_headimg);
    
    headImg_str=JSON.parse(sessionStorage.userInfo).t_headimg
}
}
// console.log(userName)
function showUser(){
    if(userName){
        // $('#headImg').style
        var head_str = `<img src=" ${headImg_str} " alt=""> `
        $('#username').append(userName)
        $('#headImg').append(head_str)
        
        $('#beforeLog').css("display","none")
    }else{
        $('#logout').css("display","none")
    }
}
showUser()

function logout(){
    sessionStorage.clear()
    userInfo=null
    userName=null
    headImg=null
}
$('#logout').on('click',function(){logout()})

// 返回顶部
$('.div_bot').click(function () {
    $('html').animate({
        scrollTop: 0
    }, 500);
})
