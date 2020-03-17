// http://118.24.25.7/chat_api/doc/
//=============================初始页面============================
//定义全局变量
var uname = ""; //用户名
var str_friendList = ""; //好友列表字符串
var str_getprocessFriendRequest = ""; //好友申请字符串
var FriendList = null; //好友列表数据
var getprocessFriendRequest = null; //好友申请数据
var last_proFriendReq_length = 0; //上一次好友申请的数量
var chat_nick = ""; //好友昵称
var chat_tx = ""; //好友头像
var online = 0; //默认离线
var chatNum = 0; //默认与0个好友聊天
var str_addChat = ""; //聊天好友的字符串
var Histoy = null; //历史记录数据
var str_xrMes1 = ""; //历史消息字符串
var str_xrMes2 = ""; //实时消息字符串
var NowChatfriendId = 0;//当前聊天的id
var str_search = ""//搜索好友字符串
const URL = "http://118.24.25.7/chat_api/interface/"; //接口地址前缀
// const URL = "http://172.16.13.22/chat_api/interface/"; //接口地址前缀

var addChatArr = []; //聊天好友的id数组
var MesArr = []; //消息数组



//阻止默认行为
document.body.onselectstart = document.body.ondrag = function() {
	return false;
}

//数据转成JSON格式
var userInfo = "";
userInfo = JSON.parse(sessionStorage.userInfo);
uname = userInfo.nickname;
console.log(userInfo)
// if(sessionStorage==null){//如果没有数据就返回登录注册页面
// 	window.location.href = "reg&login.html";
// }


//页面加载获取好友列表
window.onload = function() {
	getFriendList();
}

//刷新好友列表
$('.icon-ren1').click(function(){
	getFriendList();
})

//初始化用户
$('.uname').html(uname);

// ===============================界面事件开始================================
//移动用户界面
$('.move').mousedown(function() {
	var Ev = window.event || arguments[0];
	var offX = Ev.offsetX;
	var offY = Ev.offsetY;
	$(document).mousemove(function() {
		var ev = window.event || arguments[0];
		var pax = ev.pageX;
		var pay = ev.pageY;
		var x = pax - offX;
		var y = pay - offY;
		if (x < 0) {
			x = 0;
		} else if (x > $(document).width() - $('.main_box').outerWidth(true)) {
			x = $(document).width() - $('.main_box').outerWidth(true);
		}
		if (y < 0) {
			y = 0;
		} else if (y > $(document).height() - $('.main_box').outerHeight(true)) {
			y = $(document).height() - $('.main_box').outerHeight(true);
		}
		// console.log(x, y);
		$('.main_box').css({
			left: x + 'px',
			top: y - 50 + 'px'
		})
	})
})

// 弹起事件
$(document).mouseup(function() {
	$(document).off("mousemove");
})

//移动聊条框
$('.chat_top').mousedown(function() {
	var Ev = window.event || arguments[0];
	var offX = Ev.offsetX;
	var offY = Ev.offsetY;
	$(document).mousemove(function() {
		var ev = window.event || arguments[0];
		var pax = ev.pageX;
		var pay = ev.pageY;
		var x = pax - offX;
		var y = pay - offY;
		if (x < 165) {
			x = 165;
		} else if (x > $(document).width() - $('.main_box').outerWidth(true) - 330) {
			x = $(document).width() - $('.main_box').outerWidth(true) - 330;
		}
		if (y < 10) {
			y = 10;
		} else if (y > $(document).height() - $('.main_box').outerHeight(true) + 30) {
			y = $(document).height() - $('.main_box').outerHeight(true) + 30;
		}
		// console.log(x, y);
		$('.chat').css({
			left: x + 230 + 'px',
			top: y + 265 + 'px'
		})
	})
})

// 弹起事件
$(document).mouseup(function() {
	$(document).off("mousemove");
})

//移动通知框
$('.Message_header').mousedown(function() {
	var Ev = window.event || arguments[0];
	var offX = Ev.offsetX;
	var offY = Ev.offsetY;
	$(document).mousemove(function() {
		var ev = window.event || arguments[0];
		var pax = ev.pageX;
		var pay = ev.pageY;
		var x = pax - offX;
		var y = pay - offY;
		if (x < 0) {
			x = 0;
		} else if (x > $(document).width() - $('.main_box').outerWidth(true) - 330) {
			x = $(document).width() - $('.main_box').outerWidth(true) - 330;
		}
		if (y < 0) {
			y = 0;
		} else if (y > $(document).height() - $('.main_box').outerHeight(true) + 30) {
			y = $(document).height() - $('.main_box').outerHeight(true) + 30;
		}
		// console.log(x, y);
		$('.Message_box').css({
			left: x + 230 + 'px',
			top: y + 265 + 'px'
		})
	})
})

// 弹起事件
$(document).mouseup(function() {
	$(document).off("mousemove");
})


//点击用户界面放大缩小
$('.main_box .icon-suoxiao').click(function() {
	$('.main_box').css("display", "none");
	$('.kk_logo').css("opacity", "1");
})

$('.kk_logo').click(function() {
	$('.main_box').css("display", "block");
	$('.kk_logo').css("opacity", "0");
})

//退出界面并清空数据
$('.main_box .icon-guanbi').click(function() {
	window.location.href = 'page/reg&login.html';
	window.sessionStorage = null;
})

//关闭缩小聊天界面
$('.chat_box .icon-suoxiao').click(function() {
	$('.chat').css('display', 'none');
})

$('.closeMes').click(function() {
	var f_id = $(this).attr("id");
	// console.log($('.add_chat').find(`.${f_id}`));
	$('.add_chat').find(`.${f_id}`).remove();
	addChatArr.splice($.inArray(f_id, addChatArr), 1);
	chatNum--;
	console.log(chatNum)
	if (chatNum < 2) {
		$('.add_chat').css("background-color", "transparent");
		$('.add_chat>li').css("opacity", "0");
		if(chatNum < 1){
			$('.chat').css('display', 'none');
		}
	}
})

$('.chat_box .icon-guanbi').click(function() {
	$('.add_chat').html("");
	addChatArr = [];
	chatNum = 0;
	$('.add_chat').css("background-color", "transparent");
	$('.add_chat>li').css("opacity", "0");
	$('.chat').css('display', 'none');
})

//关闭缩小好友请求页面
$('.Message_box_menu .icon-suoxiao').click(function() {
	$('.Message_box').css('display', 'none');
})

$('.Message_box_menu .icon-guanbi').click(function() {
	$('.Message_box').css('display', 'none');
})

$('.icon-notice').click(function() {
	$('.Message_box').css('display', 'block');
})

//好友列表菜单项
$('.group>li').each(function(index, item) {
	$('.group>li').eq(index).click(function() {
		if (index == 0) {
			$('.char_div').css("display", "block").siblings().css("display", "none");
		} else if (index == 1) {
			$('.friend_div').css("display", "block").siblings().css("display", "none");
		} else {
			$('.fris_div').css("display", "block").siblings().css("display", "none");
		}
	})
})

//好友列表菜单下边框
$('.group>li').click(function() {
	$(this).css("border-bottom", "2px solid #39aeca61").siblings().css("border-bottom", "2px solid #dcdcdc61");
})

//页面层级
// console.log($('.content>div'));
$('.content>div').each(function(index, item) {
	$('.content>div').eq(index).mousedown(function() {
		$(this).css("z-index", "5").siblings().css("z-index", "1");
		$('.mes').css("z-index", "999");
	})
})



//添加好友界面
$('.add_friend .icon-guanbi').click(function() {
	$('.add_friend').css('display', 'none');
})

$('.add_fri .icon-add').click(function() {
	$('.add_friend').css('display', 'block');
})

$('.add_friend_box button').click(function() {
	if ($('.add_friend_box input').val() != "") {
		addFriend($('.add_friend_box input').val());
		$('.add_friend_box input').val("");
		Mes();
	} else {
		$('.mes>p').html("id不能为空！");
		Mes();
	}

})

//历史记录的获取
$('.icon-liaotianjilu').click(function(){
	$('.chat_ul').animate({
		scrollTop : 0
	},1000);
});

//设置皮肤颜色
for(var i=0;i<4;i++){
	$('.color_range').eq(i).change(function(){
		setChatColor();
	})
}

for(var i=4;i<8;i++){
	$('.color_range').eq(i).change(function(){
		setBubbleColor();
	})
}


$('.color_btn1').click(function(){
	var ba_color = ($('.show_skin1').css("background-color"));
	$('.header').css("background-color",`${ba_color}`);
})

$('.color_btn2').click(function(){
	var ba_color = ($('.show_skin2').css("background-color"))
	$('.my_info .chating_info').css("background-color",`${ba_color}`);
})

//关闭打开设置皮肤
$('.skin_menu .icon-guanbi').click(function(){
	$('.skin').css("display","none");
})

$('.icon-pifu').click(function(){
	$('.skin').css("display","block");
})

//关于我
$('.icon-guanyu').click(function(){
	alert("吴秋林作品！！！");
})

// ===============================界面事件结束================================


// ==============================事件方法调用=================================

// 获取好友申请
getFriendRequests();

// 发消息
$(".sendMes").click(function() {
	sendMes()
})

//搜索好友
$(".search_head .btn").click(function(){
	$('.search_ul').html("");
	getSearchUsers($(".search_head input").val());
})


//键盘事件
document.onkeydown = function(ev) {
	var event = ev || event;
	if (event.keyCode == 13) {
		sendMes();
	}
}

//关闭打开搜索框
$(".search_menu_box .icon-guanbi").click(function(){
	$('.search_ul').html("");
	$('.searchFriend').css("display","none");
})

$(".icon-soushuo").click(function(){
	$('.searchFriend').css("display","block");
})

// ==============================事件方法封装=================================
// 获取好友列表并渲染
var lastFriendLength = 0; //上一次好友的长度
function getFriendList() {
	$.ajax({
		type: "GET",
		url: URL + "getFriends.php",
		async: true, // async----> 同步：false，异步：true 
		data: {
			sign_str: userInfo.sign_str,
			user_id: userInfo.id
		},
		success: function(res) { //返回接受信息
			// console.log(res);
			if (res.code == 0) {
				// console.log(res.data);
				FriendList = res.data;
				str_friendList = ""; //刷新数据
				res.data.forEach(function(item, index) {
					str_friendList +=
						`<li class="${FriendList[index].user_id} friLi" ondblclick="open_chat(${index},${FriendList[index].user_id},$(this))">
									<div class="fri_tx">
										<img src="img/tx/tx.jpg" >
									</div>
									<div class="fri_info">
										<p class="fri_name">${FriendList[index].nickname}</p>
										<p class="fri_qm"></p>
									</div>
									<menu>
										<ul class="menu_ul">
											<li class="del">删除</li>
											<li class="cancel">取消</li>
										</ul>
									</menu>
									<div class="promptMsg dis_center">
										<p>0</p>
									</div>
								</li>`;
				})
					$('.friendList').html(str_friendList); //添加列表
				
			} else {
				console.log("获取失败！");
				$('.friendList').html("<li onclick='Refresh()'><p>加载失败，点击重试！di<i class='iconfont icon-f14'></i></p></li>");
			}
		},
		error(err) {
			console.log(err);
			console.log("获取失败！");
			$('.friendList').html("<li onclick='Refresh()'><p>加载失败，点击重试！<i class='iconfont icon-f14'></i></p></li>");
		}
	})
}


//消息框淡入淡出
function Mes() {
	setTimeout(function() {
		$('.mes').fadeIn()
		setTimeout(function() {
			$('.mes').fadeOut();
		}, 1300)
	}, 500);
}

//刷新函数
function Refresh() {
	location.reload();
}

//点击好友列表并打开对应的聊天界面
function open_chat(index, fri_id,th) {
	th.find(".promptMsg>p").html("0");
	th.find(".promptMsg").css("display","none");
	if ($.inArray(fri_id, addChatArr) == -1) {
		chatNum++;
	}
	chat_nick = FriendList[index].nickname;
	addChat(chatNum, chat_nick, fri_id);
	online = FriendList[index].online;
	$('.chat').css("display", "block");
	// console.log(FriendList[index].online)
	// 判断好友是否在线
	if (online == 0) {
		$('.chat_nick>p').css("color", "red")
		$('.chat_nick>p').html("离线");
	} else {
		$('.chat_nick>p').css("color", "#2ee12e")
		$('.chat_nick>p').html("在线");
	}
	$('.chat_nick>h2').html(chat_nick);
	$('.closeMes').attr("id", fri_id);

	// 渲染消息,更新
	NowChatfriendId = fri_id;
	getChatHistory(fri_id);
}

//增加聊天的个数
function addChat(chatNum, fri_nick, fri_id) {
	console.log(chatNum, fri_nick, fri_id);
	// 判断好友的数量是否大于一个,是否好友的聊天已经添加
	if (chatNum > 0 && $.inArray(fri_id, addChatArr) == -1) {
		addChatArr.push(fri_id);
		// console.log(addChatArr);
		str_addChat =
			`<li class="${fri_id} friLi" ondblclick="open_chat2('${fri_nick}',${fri_id},$(this))">
						<div class="add_chat_tx chat_info_tx">
							<img src="img/tx/tx.jpg" >
						</div>
						<div class="add_chat_nickName">
							<p class="fri_qm">${fri_nick}</p>
							<i class="iconfont icon-guanbi1" id="${fri_id}"></i>
						</div>
						<div class="promptMsg dis_center">
							<p>21</p>
						</div>
					</li> `;
		$('.add_chat').append(str_addChat);
		if (chatNum > 1) {
			$('.add_chat').css("background-color", "rgb(217,217,217)");
			$('.add_chat>li').css("opacity", "1");
		}
	}
	var indexNum = $.inArray(fri_id, addChatArr); //数组下标
	$('.add_chat>li').eq(indexNum).css("background-color", "gray").siblings().css("background-color", "#80808047");
	// console.log(indexNum);
}

//移除好友聊天(事件代理)
$('.add_chat').click(function() {
	var ev = window.event || arguments[0];
	if (ev.target.nodeName == "I") {
		var f_id = parseInt($(ev.target).attr("id"));
		addChatArr.splice($.inArray(f_id, addChatArr), 1);
		$(ev.target).parent().parent().remove();
		// 如何移出列表里的当前项后选择上一项


		chatNum--;
		if (chatNum < 2) {
			$('.add_chat').css("background-color", "transparent");
			$('.add_chat>li').css("opacity", "0");
		}
		console.log(chatNum,addChatArr);
	}
})


//点击聊天框左侧的列表打开对应的聊天框
function open_chat2(fri_nick, fri_id, th) {
	$(".promptMsg>p").html("0");
	$(".promptMsg").css("display","none");
	th.css("background-color", "gray").siblings().css("background-color", "#80808047");
	$('.chat_nick>h2').html(fri_nick);
	$('.closeMes').attr("id", fri_id);
	// 渲染消息 更新
	NowChatfriendId = fri_id;
	getChatHistory(fri_id);
}


//添加好友
function addFriend(friend_id) {
	$.ajax({
		type: "POST",
		url: URL + "addFriend.php",
		async: true, // async----> 同步：false，异步：true 
		data: {
			sign_str: userInfo.sign_str,
			user_id: userInfo.id,
			friend_user_id: friend_id
		},
		success: function(res) { //返回接受信息
			if (res.code == 0) {
				console.log(res.msg);
				$('.mes>p').html(res.msg);
			} else {
				console.log(res.msg);
				$('.mes>p').html(res.msg);
			}
		},
		error(err) {
			console.log(err);
			$('.mes>p').html("服务器出错！");
		},
		complete() {
			Mes();
		}
	})
}

//删除好友
$('.friendList').contextmenu(function() { //用户右击鼠标时触发并打开上下文菜单。
	var Ev = window.event || arguments[0]; //兼容性   获取事件对象
	//左键为1   右键为2
	if (Ev.button == 2) {
		Ev.preventDefault(); //阻止默认事件

		if (Ev.target.nodeName == "LI") {
			var clickLeft = Ev.offsetX; //获取鼠标右击时在父元素中x的坐标位置
			var clickTop = Ev.offsetY; //获取鼠标右击时在父元素中y的坐标位置
			var cla = "";
			cla = $(Ev.target).attr("class");
			//设置菜单的位置
			$(Ev.target).children("menu").css('display', "block").parent().siblings().children("menu").css('display', "none");
			$(".menu_ul").css('left', clickLeft + "px");
			$(".menu_ul").css('top', clickTop + "px");
			$("*").not(`.${cla}`).click(function() {
				// 表示document类除cla类以外的所有元素；另外，注意*表示所有元素
				// 删除好友
				$(Ev.target).children("menu").css('display', "none");
			});
			cla = "";
			$('.del').click(function() {
				//删除
				cla = $(Ev.target).attr("class");
				// console.log(cla);
				removeFriend(cla);
				$(Ev.target).children("menu").css('display', "none");
			})

			//取消
			$('.cancel').click(function() {
				$(Ev.target).children("menu").css('display', "none");
			})
			// console.log(clickLeft,clickTop);
			// console.log($(Ev.target).attr("class"));
			// console.log($(Ev.target).children("menu"));
			// console.log($(Ev.target));
		}
	}
})

//删除好友的函数
function removeFriend(fri_id) {
	console.log(fri_id)
	$.ajax({
		type: "POST",
		url: URL + "removeFriend.php",
		async: true, // async----> 同步：false，异步：true 
		data: {
			sign_str: userInfo.sign_str,
			user_id: userInfo.id,
			friend_id: fri_id
		},
		success: function(res) { //返回接受信息
			if (res.code == 0) {
				console.log(res.msg);
				$('.mes>p').html("删除成功！");
			} else {
				console.log(res.msg);
				$('.mes>p').html("删除失败！");
			}
		},
		error(err) {
			console.log(err);
			$('.mes>p').html("服务器出错！");
		},
		complete() {
			getFriendList();
			Mes();
		}
	})
}




//获取申请
var timer = null; //初始定时器
function getFriendRequests() {
	$.ajax({
		type: "GET",
		url: URL + "getFriendRequests.php",
		async: true, // async----> 同步：false，异步：true 
		data: {
			sign_str: userInfo.sign_str,
			user_id: userInfo.id
		},
		success: function(res) { //返回接受信息
			// console.log(res.data);
			if (res.code == 0) {
				getprocessFriendRequest = res.data;
				// console.log(getprocessFriendRequest[0].request_id);
				//消息盒子的闪动
				// console.log(getprocessFriendRequest.length);
				clearInterval(timer);
				//条件：上一次的请求数量小于这次的，消息盒子为隐藏状态，上一次的数量不为0
				if ($('.Message_box').css('display') == "none" && getprocessFriendRequest.length != 0) {
					timer = setInterval(function() {
						$('.icon-notice').animate({
							opacity: 0
						}, 500, function() {
							$('.icon-notice').animate({
								opacity: 1
							}, 500);
						});
					}, 1000);
				} else if ($('.Message_box').css('display') == "block") {
					clearInterval(timer);
				}
				str_getprocessFriendRequest = ""; //刷新数据
				getprocessFriendRequest.forEach(function(item, index) {
					str_getprocessFriendRequest +=
						`<li>
							<div class="Message_info">
								<div class="Message_tx">
								<img src="img/tx/tx.jpg" >	
								</div>
								<div class="Message_nick dis_center">
									<p>${getprocessFriendRequest[index].nickname}</p>
									<p>申请加你为好友</p>
								</div>
								<div class="Message_time dis_center">
									<p>${getprocessFriendRequest[index].time}</p>
								</div>
							</div>
							<div class="Message_processing">
								<button type="button" class="btn" onclick="processFriendRequest(${getprocessFriendRequest[index].user_id},${getprocessFriendRequest[index].request_id},1,$(this))">同意</button>
								<button type="button" class="btn" onclick="processFriendRequest(${getprocessFriendRequest[index].user_id},${getprocessFriendRequest[index].request_id},2,$(this))">不同意</button>
							</div>
							<div class="agree">
								<p>已同意</p>
							</div>
						</li>`;
				});
				
				if ($('.Message_body_ul').height() >= 419) {
					$('.Message_body_ul').css('overflow-y', 'scroll');
				}
				// console.log(res.data);
			} else {
				console.log("获取失败！");
			}
		},
		error(err) {
			console.log(err);
		},
		complete() {
			$('.Message_body_ul').html(str_getprocessFriendRequest);
			setTimeout(getFriendRequests, 1000);
		}
	})
}


//处理好友申请
function processFriendRequest(from_id, request_id, process_result, th) {
	// console.log(from_id, request_id, process_result);
	th.parent().parent().remove();
	$.ajax({
		type: "POST",
		url: URL + "processFriendRequest.php",
		async: true, // async----> 同步：false，异步：true 
		data: {
			sign_str: userInfo.sign_str,
			user_id: userInfo.id,
			from_user_id: from_id,
			request_id: request_id,
			process_result: process_result

		},
		success: function(res) { //返回接受信息
			console.log(res);
			if (res.code == 0) {
				console.log(res.data);
				getFriendList()
			} else {
				console.log("获取失败！");
			}
		},
		error(err) {
			console.log(err);
		}
	})
}



//接收、获取消息并渲染
function getMessages() {
	$.ajax({
		type: "GET",
		url: URL + "/getMessages.php",
		async: true, // async----> 同步：false，异步：true 
		data: {
			sign_str: userInfo.sign_str,
			user_id: userInfo.id
		},
		success: function(res) { //返回接受信息
			if (res.code == 0) {
				//将消息渲染
				if (res.data.length > 0) {
					$.each(res.data,function(index){
						if (res.data[index].user_id == NowChatfriendId) {
							// console.log(NowChatfriendId);
							str_xrMes2 =
								`<li>
									<p class="chat_time">${res.data[index].message_send_time}</p>
									<div class="chat_friend_info">
										<div class="chat_info_tx">
											<img src="img/tx/tx.jpg">
										</div>
										<div>
											<p class="fri_chat_info chating_info">${res.data[index].message}</p>
										</div>
									</div>
								</li>`;
						
							$('.chat_ul').append(str_xrMes2);
							$('.chat_ul')[0].scrollTop = $('.chat_ul')[0].scrollHeight;
							
						}
							$(`.${res.data[index].user_id} .promptMsg`).css("display","block");
							$(`.${res.data[index].user_id} .promptMsg>p`).html(Number($(`.${res.data[0].user_id} .promptMsg>p`).html())+1);
							$(`.${res.data[index].user_id} .fri_qm`).text(`${res.data[index].message}`);
					});
							
				}
			} else {
				console.log("获取失败！");
				console.log(res);
			}
		},
		error(err) {
			console.log(err);
			console.log("获取失败！");
		},
		complete() {
			setTimeout(getMessages(), 1000);
		}
	})
}

//接收消息
getMessages();


//获取聊天记录并渲染
function getChatHistory(fri_id) {
	$.ajax({
		type: "GET",
		url: URL + "/getChatHistory.php",
		async: true, // async----> 同步：false，异步：true 
		data: {
			sign_str: userInfo.sign_str,
			user_id: userInfo.id,
			friend_id: fri_id
		},
		success: function(res) { //返回接受信息
			// console.log();
			if (res.code == 0) {
				// console.log(res.data);
				Histoy = res.data;
				// 渲染
				str_xrMes1 = "";
				$('.chat_ul').html("");
				if (Histoy.length > 0) {
					// console.log(res.data);
					$.each(Histoy, function(index) {
						if (Histoy[index].user_id == fri_id) {
							str_xrMes1 =
								`<li>
									<p class="chat_time">${Histoy[index].me_seessagnd_time}</p>
									<div class="chat_friend_info">
										<div class="chat_info_tx">
											<img src="img/tx/tx.jpg">
										</div>
										<div>
											<p class="fri_chat_info chating_info">${Histoy[index].message}</p>
										</div>
									</div>
								</li>`;
						} else if (Histoy[index].user_id == userInfo.id) {
							str_xrMes1 =
								`<li class="my_info">
								<p class="chat_time">${Histoy[index].message_send_time}</p>
								<div class="chat_friend_info">
									<div class="chat_info_tx">
										<img src="img/tx/my_tx.jpg">
									</div>
									<div>
										<p class="fri_chat_info chating_info">${Histoy[index].message}</p>
									</div>
								</div>
							</li>`;
						}
						$('.chat_ul').append(str_xrMes1);
					});
					$('.chat_ul').animate({
						scrollTop : $('.chat_ul')[0].scrollHeight
					},200);
				}
			} else {
				console.log("获取失败！");
				console.log(res);
			}
		},
		error(err) {
			console.log(err);
			console.log("获取失败！");
		}
	})
}



//发送消息
var str_send = "";

function sendMessage(fri_id, mesValue) {
	$.ajax({
		type: "POST",
		url: URL + "/sendMessage.php",
		async: true, // async----> 同步：false，异步：true 
		data: {
			sign_str: userInfo.sign_str,
			user_id: userInfo.id,
			receive_user_id: fri_id,
			message: mesValue
		},
		success: function(res) { //返回接受信息
			// console.log();
			if (res.code == 0) {
				var Nowtime = getTime();
				// console.log(res.data);
				str_send =
					`<li class="my_info">
					<p class="chat_time">${Nowtime}</p>
					<div class="chat_friend_info">
						<div class="chat_info_tx">
							<img src="img/tx/my_tx.jpg">
						</div>
						<div>
							<p class="fri_chat_info chating_info">${mesValue}</p>
						</div>
					</div>
				</li>`;
				$('.chat_ul').append(str_send);
				$('.chat_ul').animate({
					scrollTop : $('.chat_ul')[0].scrollHeight
				},200);
			} else {
				console.log("获取失败！");
				console.log(res);
			}
		},
		error(err) {
			// console.log(err);
			console.log("获取失败！");
		}
	})
}

//获取系统日期的函数
function getTime() {
	var myDate = new Date();
	var mytime = myDate.toLocaleString();
	return mytime;
}


//发送消息的函数
function sendMes() {
	var numId = $('.closeMes').attr('id');
	if ($(".chat_text").val() != "") {
		sendMessage(numId, $(".chat_text").val());
		$(".chat_text").val("");
	}
}


//移入出现滚动条，移出消失的函数
// function isScroll(obj){
// 	$(obj).hover(function(){
// 		$(obj).css("overflow-y","auto");
// 	},function(){
// 		$(obj).css("overflow-y","hidden");
// 	});
// }

// isScroll($(".friendList"));
// isScroll($(".chat_ul"));

//搜索好友
function getSearchUsers(search_text) {
	$.ajax({
		type: "GET",
		url: URL + "/getSearchUsers.php",
		async: true, // async----> 同步：false，异步：true 
		data: {
			sign_str: userInfo.sign_str,
			user_id: userInfo.id,
			search_text: search_text
		},
		success: function(res) { //返回接受信息
			// console.log();
			if (res.code == 0) {
				// console.log(res.data);
				//渲染
				$.each(res.data,function(index){
					str_search = `<li>
							<div class="Message_info">
								<div class="Message_tx">
								<img src="img/tx/tx.jpg" >	
								</div>
								<div class="Message_nick dis_center">
									<p class="search_nick">昵称:${res.data[index].nickname}</p>
									<p class="search_id">kk(id):${res.data[index].id}</p>
								</div>
								<div class="Message_time dis_center">
									<p class="search_uname">用户名:${res.data[index].username}</p>
								</div>
							</div>
						</li>`;
					$('.search_ul').append(str_search);
				});
			} else {
				console.log("获取失败！");
				console.log(res);
			}
		},
		error(err) {
			console.log(err);
			console.log("获取失败！");
		}
	})
}

//设置界面皮肤颜色的函数
function setChatColor() {
	var color1 = Number($('.color_range1').val());
	var color2 = Number($('.color_range2').val());
	var color3 = Number($('.color_range3').val());
	var opci1 = Number($('.opci1').val())/10;
	$('.show_skin1').css("background-color",`rgba(${color1},${color2},${color3},${opci1})`)
}

//设置气泡皮肤颜色的函数
function setBubbleColor() {
	var color1 = Number($('.color_range4').val());
	var color2 = Number($('.color_range5').val());
	var color3 = Number($('.color_range6').val());
	var opci2 = Number($('.opci2').val())/10;
	console.log(color1,color2,color3,opci2);
	$('.show_skin2').css("background-color",`rgba(${color1},${color2},${color3},${opci2})`)
}
