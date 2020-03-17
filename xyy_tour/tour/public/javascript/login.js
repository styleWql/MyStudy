var a = 0
//登陆注册状态码
var b = 0
//验证码状态码

//注册与登陆的转换
function goReg() {
    $('#logf')[0].style.display = 'none'
    $('#regf')[0].style.display = 'flex'
    a = 1
}
function goLog() {
    $('#regf')[0].style.display = 'none'
    $('#logf')[0].style.display = 'flex'
    a = 0
}
$('.mainCont').click(function () {
    var ev = ev || window.event;
    var targ = ev.target || ev.srcElement;
    if (targ.id == 'goReg') {
        goReg()
    } else if (targ.id == 'backtolog') {
        goLog()
    }
})
//验证码
function create_code() {
    function shuffle() {
        var arr = ['1', 'Q', '4', 'S', '6', 'D', 'I', '2', '8', '7', 'A', 'B', 'C', '9', 'E', 'F', 'G', 'H', '0', 'J', 'K', 'L', 'M', 'N', 'O', 'P', '3', 'R', '5', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        return arr.sort(function () {
            return (Math.random() - .5);
        });
    };
    shuffle();

    function showAuthCode() {
        var ar1 = '';
        var code = shuffle();
        for (var i = 0; i < 4; i++) {
            ar1 += code[i];
        };
        $("#verifyCode").text(ar1);
    };
    showAuthCode();
    $("#verifyCode").click(function () {
        showAuthCode();
    });
}
create_code();
//验证码失去焦点
$("#verify").blur(function () {
    var code1 = $('#verify').val().toLowerCase();
    var code2 = $("#verifyCode").text().toLowerCase();
    if ($('#verify').val() == "") {
        // $('#verify').addClass("errorInput");
        $(this)[0].placeholder = "验证码不能为空！";
        // $('.errorInput')[0].placeholder='验证码不能为空！'
        console.log($(this))
        return;
    } else if (code1 != code2) {
        console.log($(this))
        // $(this).addClass("errorInput");
        $(this)[0].value = '';
        $(this)[0].placeholder = '验证码错误！'
        b = 0
    } else {
        b = 1
        $(this).removeClass("errorInput");
        $(this).next().next().empty();
        $(this).addClass("correctInput");
    }
})
//密码失去焦点
$(".psw").blur(function () { pswVerify() });
function pswVerify() {
    console.log($(".psw")[a].value)
    psw0 = /^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9]{6,16}$/
    //     排除纯数字  派除纯字母    只能字母和数字 6-16位
    if (a == 1 && !psw0.exec($(".psw")[a].value)) {
        $(".psw")[a].value = '';
        $(".psw")[a].placeholder = "格式错误！需要6-16位包含英文和数字";
    }
};
$("#pswConfirm").blur(function () {
    // console.log($("#pswReg")[0].value)
    // console.log($("#pswConfirm")[0].value)
    var psw1 = $("#pswReg")[0].value;
    var psw2 = $("#pswConfirm")[0].value;
    if (psw2 == "" && psw1 != "") {
        $(this)[0].placeholder = "请确认密码！";
    } else if (psw1 != psw2) {
        $(this)[0].value = '';
        $(this)[0].placeholder = "两次输入不一致！";
    }
})

$('#log').click(function () {  
    if ($('#usernameInput').val() != "" && $('#pswInput').val() != "" && b == 1) {
        $.ajax({
            url: 'log/log.php', //请求的url地址
            dataType: "json", //返回格式为json
            async: true,
            xhrFields: {
                withCredentials: true
            },//请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                username: $('#usernameInput').val(),
                password: $('#pswInput').val(),
            }, //参数值
            type: "post", //请求方式
            beforeSend: function () {
            },
            success: function (req) {
                //请求成功时处理
                //    console.log(req);
                console.log(req)
                if (req.code == 0) {
                    var data = req.data[0]
                    delete data.t_pwd//删除属性
                    sessionStorage.userInfo = JSON.stringify(data)
                    console.log(sessionStorage.userInfo)
                    //    alert('欢迎你！'+$('#usernameInput').val())
                    window.location.href = 'index.html';
                    // location.href=location.pathname;
                }
            },
            error: function (req) {
                //请求出错处理
                console.log(req)
            }
        })
    }
});
//注册
$('#Reg').click(function () {
    if ($('#UsernameReg').val() != "" && $('pswReg').val() != "") {
        $.ajax({
            url: 'log/reg.php', //请求的url地址
            dataType: "json", //返回格式为json
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                username: $('#UsernameReg').val(),
                password: $('#pswReg').val(),
            }, //参数值
            type: "post", //请求方式
            beforeSend: function () {
            },
            success: function (req) {
                //请求成功时处理
                //    console.log(req);
                //    console.log(req)
                if (req.code == 0) {
                    sessionStorage.user = $('#usernameInput').val();
                    alert('欢迎新朋友！' + $('#usernameInput').val())
                    //  window.location.href='index.html';
                    // location.href=location.pathname;
                }
            },
            error: function () {
                //请求出错处理
            }
        })
    }
});


