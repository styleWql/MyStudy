	//定义正则 字符串
		var reg1 = /^[A-Za-z][A-Za-z0-9]{5,100}$/;//用户名正则
		var reg2 = /^[A-Za-z0-9_]{6,}$/;//昵称正则
		var str_user = "";
		var str_pwd = "";
		var str_nick = "";
		var str_reg = "";
		var str_user1 = "";
		var str_pwd1 = "";
		var str_log = "";
		const URL = "http://118.24.25.7/chat_api/interface/"; //接口地址前缀
		// const URL = "http://172.16.13.22/chat_api/interface/"; //接口地址前缀
		
		//输入框获取焦点   提示语句消失
		$('.reg_inp').each(function(index,item){
			if(index==0){
				$(this).focus(function(){
					$(this).css("border","1px solid #64d2e3");
					$('.user').empty();
				})
			}else if(index==1){
				$(this).focus(function(){
					$(this).css("border","1px solid #64d2e3");
					$('.pwd').empty();
				})
			}else{
				$(this).focus(function(){
					$(this).css("border","1px solid #64d2e3");
					$('.nick').empty();
				})
			}
		})

		//用户名输入框失去焦点的事件
		$('.reg_inp').eq(0).on('blur', function() {
			if ($(this).val() == "" && $('.user').children().length == 0) { //如果用户名为空,并且没有提示语句生成
				str_user = "<p>用户名不能为空</p>";
				$('.user').html(str_user);
				$(this).css("border","1px solid red");
			} else if (!reg1.test($(this).val()) && $(this).val() != "") {
				str_user = "<p>用户名长度6-100，必须以英文字母开头，可以包含英文字母和数字</p>";
				$(this).css("border","1px solid red");
				$('.user').html(str_user);
			} else {
				$('.user').empty();
				$(this).css("border","1px solid white");
			}
		})
		
		//密码框失去焦点的事件
		$('.reg_inp').eq(1).on('blur', function() {
			if ($(this).val() == "" && $('.pwd').children().length == 0) { //如果密码为空,并且没有提示语句生成
				str_pwd = "<p>密码不能为空</p>";
				$('.pwd').html(str_pwd);
				$(this).css("border","1px solid red");
			} else if($(this).val().length<6){
				str_pwd = "<p>密码长度6位以上，可以包含字母数字和部分特殊符号</p>";
				$('.pwd').html(str_pwd);
				$(this).css("border","1px solid red");
			} else {
				$('.pwd').empty();
				$(this).css("border","1px solid white");
			}
		})
		
		//昵称框失去焦点的事件
		$('.reg_inp').eq(2).on('blur', function() {
			if ($(this).val() == "" && $('.nick').children().length == 0) { //如果密码为空,并且没有提示语句生成
				str_nick = "<p>昵称不能为空</p>";
				$('.nick').html(str_nick);
				$(this).css("border","1px solid red");
			} else if($(this).val().length>20){
				str_nick = "<p>昵称长度20字以内，可以是中文</p>";
				$('.nick').html(str_nick);
				$(this).css("border","1px solid red");
			} else {
				$('.nick').empty();
				$(this).css("border","1px solid white");
			}
		})
		
		//立即注册的点击事件
		$('.zc .btn').click(function(){
			reg();//ajax请求
			console.log(str_reg);
			setTimeout(function(){
				if(str_reg!=""){
					$('.reg').html(str_reg);
				}
			},1000)
		})



		// 注册请求
		function reg(){
			$.ajax({
				type:"POST",
				url:URL+"reg.php",
				async: true, // async----> 同步：false，异步：true 
				data:{
					username:$('#username').val(),
					password:$('#password').val(),
					nickname:$('#nickname').val()
				},
				success: function(res){//返回接受信息
				console.log(res);
				if(res.code==0){
					str_reg = "<p>注册成功!</p>";
					// window.sessionStorage.user_id = res.data.user_id;//保存用户的id
					// window.sessionStorage.username = res.data.username;//保存用户的username
					// window.location.href = "login.html";//成功跳转
				}else if(res.code==1){
					console.log("用户名、密码、昵称某项为空");
					str_reg = "<p>用户名、密码、昵称某项为空</p>";
				}else if(res.code==2){
					console.log("用户名格式不符合规范");
					str_reg = "<p>用户名格式不符合规范</p>";
				}else if(res.code==3){
					console.log("密码格式不符合规范");
					str_reg = "<p>密码格式不符合规范</p>";
				}else{
					console.log("注册失败，可能的原因包括用户名重复等");
					str_reg = "<p>注册失败，可能的原因包括用户名重复等</p>";
				}
			
				},
				error(err){
					console.log("注册失败！");
					str_reg = "<p>注册失败,服务器问题</p>";
				}
			})
		}
		
		
		//切换登录
		$('.zc .footer p').click(function(){
			$('.zc').css('transform','scale(0)');
			$('.dl').css('transform','scale(1)');
			$('.reg_inp').each(function(index,item){
				$(item).css("border","1px solid white");
			})
			$('.user').empty();
			$('.pwd').empty();
			$('.nick').empty();
			$('.reg').empty();
		})
		
		$('.dl .footer p').click(function(){
			$('.zc').css('transform','scale(1)');
			$('.dl').css('transform','scale(0)');
			$('.log_inp').each(function(index,item){
				$(item).css("border","1px solid white");
			})
			$('.user1').empty();
			$('.pwd1').empty();
			$('.login').empty();
		})
		
		//登录
		
		//输入框获取焦点   提示语句消失
		$('.log_inp').each(function(index,item){
			if(index==0){
				$(this).focus(function(){
					$(this).css("border","1px solid #64d2e3");
					$('.user1').empty();
				})
			}else{
				$(this).focus(function(){
					$(this).css("border","1px solid #64d2e3");
					$('.pwd1').empty();
				})
			}
		})
		
		//用户名输入框失去焦点的事件
		$('.log_inp').eq(0).on('blur', function() {
			if ($(this).val() == "" && $('.user').children().length == 0) { //如果用户名为空,并且没有提示语句生成
				str_user1 = "<p>用户名不能为空</p>";
				$('.user1').html(str_user1);
				$(this).css("border","1px solid red");
			} else if (!reg1.test($(this).val()) && $(this).val() != "") {
				str_user1 = "<p>用户名长度6-100，必须以英文字母开头，可以包含英文字母和数字</p>";
				$(this).css("border","1px solid red");
				$('.user1').html(str_user1);
			} else {
				$('.user1').empty();
				$(this).css("border","1px solid white");
			}
		})
		
		//密码框失去焦点的事件
		$('.log_inp').eq(1).on('blur', function() {
			if ($(this).val() == "" && $('.pwd').children().length == 0) { //如果密码为空,并且没有提示语句生成
				str_pwd1 = "<p>密码不能为空</p>";
				$('.pwd1').html(str_pwd1);
				$(this).css("border","1px solid red");
			} else if($(this).val().length<6){
				str_pwd1 = "<p>密码长度6位以上</p>";
				$('.pwd1').html(str_pwd1);
				$(this).css("border","1px solid red");
			} else {
				$('.pwd1').empty();
				$(this).css("border","1px solid white");
			}
		})
		
		//立即登录的点击事件
		function get_login(){
			$('.dl .btn').click(function(){
				login();//ajax请求
				console.log(str_log);
				setTimeout(function(){
					if(str_log!=""){
						$('.login').html(str_log);
					}
				},1000);
			})
		}
		
		get_login();
		
		//键盘事件
		document.onkeydown=function(ev){
		                var event=ev ||event
		                if(event.keyCode==13){
		                   login();//ajax请求
		                   console.log(str_log);
		                   setTimeout(function(){
		                   	if(str_log!=""){
		                   		$('.login').html(str_log);
		                   	}
		                   },1000);
		                }
		            }
		
		// 登录请求
		function login(){
			$.ajax({
				type:"POST",
				url:URL+"login.php",
				async: true, // async----> 同步：false，异步：true 
				data:{
					username:$('#username1').val(),
					password:$('#password1').val()
				},
				success: function(res){//返回接受信息
				if(res.code==0){
					str_log = "登录成功，3s后跳转！";
					//用户的所有信息
					window.sessionStorage.userInfo=JSON.stringify(res.data);
					setTimeout(function(){
						window.location.href = "../index.html";
					}, 3000);
				}else{
					console.log("登录失败！")
					str_log = "登录失败！密码或用户名错误！";
				}
				},
				error(err){
					console.log(err);
					str_log = "登录失败！服务器请求出问题咯！";
				}
			})
		}