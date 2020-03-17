
function uploadFile() {
    // let file = $('#file').get(0).files[0]
    // let formdata = new FormData()
    // //传递的信息：帖子内容、发帖的时间、发帖的人的id
    // let info = {
    //     art_content:$('.post_content_text').val(),
    //     art_time:timeFormat(),
    //     art_userid:1
    // }
    // formdata.append('photo', file)
    //  console.log(file);      
    // $.ajax({
    //     url: '/file/myPost',
    //     type: 'post',
    //     cache: false,
    //     data: formdata, 
    //     processData: false,
    //     contentType: false,
    //     success: function (data) {
    //         if (data.code == 0) {
    //             console.log(data);
    //         } else {
    //             console.log('上传失败请重试');
    //         }
    //     }
    // })

    var file = document.getElementById("file")
    var formData = new FormData();
    for (var i in file.files) {//这里如果单张上传就不必遍历直接formData.append('file',file.files[0])
        formData.append('file', file.files[i]);
    }
    $.ajax({
        url: '/files/upload',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (res) {
            if (0 == res.code) {
                // console.log(res.data);
                addArt(res.data);
            } else {
                // console.log("上传失败！");
            }
        },
        error: function () {
            // console.log('上传失败');
        }
    });
}
// console.log(JSON.parse(sessionStorage.userInfo).id);

// 插入帖子表的ajax
function addArt(arr) {
    $.ajax({
        url: '/files/myPost.php',
        type: 'post',
        data: {
            art_content: $('.post_content_text').val(),
            art_time: timeFormat(),
            art_userid: JSON.parse(sessionStorage.userInfo).id,
            art_img: `${arr}`//因为路由不能识别数组和对象，所有只能转成字符串
        },
        success(res) {
            if (res.code == 0) {
                // console.log(res.data[1][0].a_id, res.img);
                // 如果有图片才请求插入图片表中
                if (res.img != "") {
                    addArt_img(res.data[1][0].a_id, res.img)
                } else {
                    new Toast("#toast", `发帖成功！`, 3000);
                    location.href = '/community';
                }
            } else {
                new Toast("#toast", `发帖失败！`, 3000);
            }
        }
    })
}

// 插入帖子图片表的ajax
function addArt_img(a_id, str) {
    $.ajax({
        url: '/files/myPost_img.php',
        type: 'post',
        data: {
            a_id: a_id,
            art_img: str
        },
        success(res) {
            if (res.code == 0) {
                // console.log(res);
                new Toast("#toast", `发帖成功！`, 3000);
                location.href = '/community';
            } else {
                // console.log(res);
                // console.log('发贴失败！');
            }
        }
    })
}


$('.postFile').click(function () {
    // 当帖子的内容不为空时才能发起请求
    if ($('.post_content_text').val() != "") {
        uploadFile();
    } else {
        new Toast("#toast", `帖子内容不能为空!`, 3000);
    }
})


//点击点赞按钮变化和点赞数量增加
$('.c_content_btn1').click(function () {
    let ele1 = $(this).next().find('span');
    // 帖子的id
    let parentId = $(this).parent().parent().parent().parent().attr('id');
    let that = $(this);
    if ($(this).attr('src') != "/com_img/点赞 (1).png") {
        $.ajax({
            type: 'get',
            url: '/community/addLike.php',
            data: {
                // 帖子将要变化的点赞数
                likeNum: Number(ele1.text()) + 1,
                articleId: parentId
            },
            success(res) {
                if (res.code == 0) {
                    ele1.text(Number(ele1.text()) + 1);
                    that.attr('src', "/com_img/点赞 (1).png");
                } else {
                    new Toast("#toast", `${res.msg}`, 1200);
                }
            }
        })
    } else {
        $.ajax({
            type: 'get',
            url: 'community/redLike.php',
            data: {
                // 帖子将要变化的点赞数
                likeNum: Number(ele1.text()) - 1,
                articleId: parentId
            },
            success(res) {
                if (res.code == 0) {
                    ele1.text(Number(ele1.text()) - 1);
                    that.attr('src', "/com_img/点赞 (2).png");
                } else {
                    new Toast("#toast", `${res.msg}`, 1200);
                }
            }
        })
    }
})

//打开对应的评论区
$('.c_content_btn2').click(function () {
    let ele2 = $(this).parent().parent().next();
    if ($(this).attr('src') != '/com_img/评 论.png') {
        ele2.css('display', 'block');
        $(this).attr('src', '/com_img/评 论.png')
    } else {
        ele2.css('display', 'none');
        $(this).attr('src', '/com_img/评 论 (1).png')
    }
})

//评论功能
$('.btn_chat').click(function () {
    if (sessionStorage.userInfo) {
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
                url: 'community/chat.php',
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
                        this_textarea.val('');
                    } else {
                        new Toast("#toast", `${res.msg}`, 1200);
                    }
                }
            })
        } else {
            new Toast("#toast", `评论不能为空`, 1200);
        }
    } else {
        new Toast("#toast", `请你先登录！`, 1200);
    }
})

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



