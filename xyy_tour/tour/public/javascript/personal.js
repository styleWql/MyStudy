

$("li").click(function () {
    let num = $(this).index()
    let name = $(this).text()
    $(this).addClass('current').siblings().removeClass('current')
    $(".user_setting_item").eq(num).addClass('show').siblings().removeClass('show')
    $(".title").replaceWith(`<span class="title" style="margin-left: 25px;">${name}</span>`)
})
$("li").mouseover(function () {
    let current = $(this)[0].attributes[0].nodeValue
    if (current != "person_list current") {
        $(this).addClass('current1')
    }
})
$("li").mouseout(function () {
    $(this).removeClass('current1')
})
// 头像预览
$("#avatar_file").change(function () {
    let file = $('#avatar_file').get(0).files[0] //获取上传的

    let formdata = new FormData()
    formdata.append('hehe', file) 
    // console.log(file);  
    if($("#username") && sessionStorage.userInfo){
        $.ajax({
            url: 'http://localhost:3000/updateHead',
            type: 'post',
            cache: false,
            data: formdata, // 打成的数据包可以直接通过send发送
            processData: false,
            contentType: false,
            success: function (data) {
              if (data.err == 0) {
                $("#avatar_img").attr("src", `/comment_img${data.img}`);
                  $.ajax({
                      url:`updateHead.jsp?id=${JSON.parse(sessionStorage.userInfo).id}&img_src=/comment_img${data.img}`,
                      type:'get',
                      data,
                      success:function(res){
                          $("#avatar_img").attr("src", `/comment_img${data.img}`);
                          search_head()
                      }
                  })
                  
              } else {
                console.log('上传失败请重试');
              }
            }
          })
    }else{
        window.location.href='login.html'
    }     
    

});
function search_head(){
    if($("#username") && sessionStorage.userInfo){
        $.ajax({
            url:`search_head.jsp?id=${JSON.parse(sessionStorage.userInfo).id}`,
            type:'get',
            success:function(res){
                sessionStorage.head_str = res.data[0].t_headimg
                $("#avatar_img").attr("src", `${res.data[0].t_headimg}`);
                $("#headImg img").attr("src", `${res.data[0].t_headimg}`);
            }
        })
    }else{
        window.location.href='login.html'
    }
}
search_head()
//请求数据

function updatePerson() {
    if($("#username") && sessionStorage.userInfo){
        let username = $("#username1").val()
        let password = $("#password").val()
        let phone = $("#phone").val()
        let sex = $("#sex").val()
        let age = $("#age").val()
        
        var id = JSON.parse(sessionStorage.userInfo).id
        $.ajax({
            type: 'post',
            url: `/updatePerson.php`,
            data: {
                username: username,
                password: password,
                phone: phone,
                sex: sex,
                age: age,
                id: id,
            },
            success(res) {
                console.log(res);
                new Toast("#toast", '修改成功！', 1200);
            }
        })
    }else{
        window.location.href='login.html'
    }
        
}

function getPerson() {
    if($("#username") && sessionStorage.userInfo){
        var id = JSON.parse(sessionStorage.userInfo).id
        $.ajax({
            type: 'get',
            url: `/getPerson.php?id=${id}`,
            data: {},
            success(res) {
                let data = res.data[0]
                $("#username1").val(`${data.t_user}`)
                $("#password").val(`${data.t_pwd}`)
                $("#phone").val(`${data.t_phone}`)
                $("#sex").val(`${data.t_sex}`)
                $("#age").val(`${data.t_age}`)
            }
        })
    }else{
        window.location.href='login.html'
    }
    
}

getPerson()

$('#update').click(function () {
        updatePerson()
})

// $('.pos').click(function(){
//     if(sessionStorage.userInfo){
        
//        }else{
//         new Toast("#toast", '请登录！', 1200);
//            setTimeout(function(){
//             location.href = 'login.html'
//            },1500)
           
//        }
// })


// console.log($(username));
