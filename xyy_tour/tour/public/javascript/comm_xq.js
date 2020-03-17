//评论功能
$('.btn_chat').click(function () {
    if(sessionStorage.userInfo){
    let ele3 = $(this).parent().parent().next();
    let this_textarea = $(this).parent().parent().prev();
    let this_num = $(this).parent().parent().parent().prev().find('.chat_num');
    // 帖子的id
    let parentId = $(this).parent().parent().parent().parent().parent().attr('id');
    let str1 = '';
    let that = $(this);
    if (this_textarea.val() != "") {
        $.ajax({
            type: 'post',
            url: '/community/chat.php',
            data: {
                // 评论的信息（评论的内容、评论的时间、评论者id、帖子id）
                a_id: parentId,
                user_id: JSON.parse(sessionStorage.userInfo).id,
                chat_val: this_textarea.val(),
                chat_time: timeFormat(),
            },
            success(res) {
                if (res.code == 0) {
                    str1 = ` <li class="border-top pt-2">
       <div class="chat_friend_head float-left">
           <div class="chat_friend_headImg float-left">
           <img src="${JSON.parse(sessionStorage.userInfo).t_headimg}" alt="">
           </div>
           <div class="float-left ml-3">
           <a href="#">${JSON.parse(sessionStorage.userInfo).t_user}</a>
               <p>${timeFormat()}</p>
           </div>
       </div>
       <p class="chat_p float-left ml-5">${this_textarea.val()}</pclass="float-left ml-5">
   </li>`;
                    ele3.append(str1);
                    this_num.text(Number(this_num.text()) + 1);
                } else {
                    console.log(res);
                    new Toast("#toast", `${res.msg}`, 1200);
                }
                this_textarea.val('');
            }
        })
    } else {
        new Toast("#toast", `评论不能为空`, 1200);
    }
}else{
    new Toast("#toast", `请你先登录！`, 1200);
}
})

// 时间的格式函数
function timeFormat() {
    var ss = new Date().getTime() + 3600000;
    return (new Date(ss).toLocaleString('chinese', { hour12: false })).replace(/\//g, '-');
}

// 返回顶部
$('.div_bot').click(function () {
    $('html').animate({
        scrollTop: 0
    }, 500);
})