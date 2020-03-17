window.onload = function(){
	var li_Ms_block = document.getElementById("li_Ms_block");//获取包裹整个影藏导航的对象
	var li_Men_block = document.getElementById("li_Men_block");//获取包裹整个影藏导航的对象
	var li_Children_block = document.getElementById("li_Children_block");
	var li_Gift_block = document.getElementById("li_Gift_block");
	var li_Watch_block = document.getElementById("li_Watch_block");
	var li_Home_block = document.getElementById("li_Home_block");
	var li_Fendi_block = document.getElementById("li_Fendi_block");
	var li_Search_block = document.getElementById("li_Search_block");
	var li_Fis_block = document.getElementById("li_Fis_block");
	
	
	var li_Ms = document.getElementById("li_Ms");//获取女士li 的对象
	var li_Men = document.getElementById("li_Men");//获取男士li 的对象
	var li_Children = document.getElementById("li_Children");//获取童装li 的对象
	var li_Gift = document.getElementById("li_Gift");//获取赠礼li 的对象
	var li_Watch = document.getElementById("li_Watch");//获取腕表li 的对象
	var li_Home = document.getElementById("li_Home");//获取家居li 的对象
	var li_Fendi = document.getElementById("li_Fendi");//获取fendi li 的对象
	var li_Search = document.getElementById("li_Search");//获取寻找精品店 li 的对象
	var li_Fis = document.getElementById("li_Fis");//获取fis li 的对象
	
	var nav_hidden_Ms = document.getElementById("nav_hidden_Ms");//获取女士隐藏的二级导航
	var nav_hidden_Men = document.getElementById("nav_hidden_Men");//获取男士隐藏的二级导航
	var nav_hidden_Children = document.getElementById("nav_hidden_Children");//获取童装隐藏的二级导航
	var nav_hidden_Gift = document.getElementById("nav_hidden_Gift");//获取赠礼隐藏的二级导航
	var nav_hidden_Watch = document.getElementById("nav_hidden_Watch");//获取腕表隐藏的二级导航
	var nav_hidden_Home = document.getElementById("nav_hidden_Home");//获取家居隐藏的二级导航
	var nav_hidden_Fendi = document.getElementById("nav_hidden_Fendi");//获取家居隐藏的二级导航
	var nav_hidden_Search = document.getElementById("nav_hidden_Search");//获取寻找隐藏的二级导航
	var nav_hidden_Fis = document.getElementById("nav_hidden_Fis");//获取fis隐藏的二级导航
	
	var head = document.getElementById("head");//获取头部对象
	var content = document.getElementById("content")//获取主体的对象
	
	
	
	var headHeight = 123;//设置初始值
	// var curIdx = 0; 
	// 设置margin-top
	nav_hidden_Ms.style.marginTop = head.offsetHeight+'px';
	nav_hidden_Men.style.marginTop = head.offsetHeight+'px';
	nav_hidden_Children.style.marginTop = head.offsetHeight+'px';
	nav_hidden_Gift.style.marginTop = head.offsetHeight+'px';
	nav_hidden_Watch.style.marginTop = head.offsetHeight+'px';
	nav_hidden_Home.style.marginTop = head.offsetHeight+'px';
	nav_hidden_Fendi.style.marginTop = head.offsetHeight+'px';
	nav_hidden_Search.style.marginTop = head.offsetHeight+'px';
	nav_hidden_Fis.style.marginTop = head.offsetHeight+'px';
	
	content.style.marginTop = head.offsetHeight+'px';
	
	window.onresize = function(){
		var headHeight = head.offsetHeight;
		nav_hidden_Ms.style.marginTop = headHeight+'px';
		nav_hidden_Men.style.marginTop = headHeight+'px';
		nav_hidden_Children.style.marginTop = head.offsetHeight+'px';
		nav_hidden_Gift.style.marginTop = head.offsetHeight+'px';
		nav_hidden_Watch.style.marginTop = head.offsetHeight+'px';
		nav_hidden_Home.style.marginTop = head.offsetHeight+'px';
		nav_hidden_Fendi.style.marginTop = head.offsetHeight+'px';
		nav_hidden_Fendi.style.marginTop = head.offsetHeight+'px';
		nav_hidden_Fis.style.marginTop = head.offsetHeight+'px';
		
		content.style.marginTop = head.offsetHeight+'px';
		// console.log(head.offsetHeight);
	}
	// 女士
	li_Ms.onmouseover = function(){
		nav_hidden_Ms.style.display = "block";
		li_Ms.style.borderBottom = "4px solid #fab948";
		
		nav_hidden_Men.style.display = "none";
		li_Men.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Children.style.display = "none";
		li_Children.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Gift.style.display = "none";
		li_Gift.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Watch.style.display = "none";
		li_Watch.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Home.style.display = "none";
		li_Home.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fendi.style.display = "none";
		li_Fendi.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Search.style.display = "none";
		li_Search.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fis.style.display = "none";
		li_Fis.style.borderBottom = "4px solid transparent";
	}
	
	li_Ms_block.onmouseout = function(){
		nav_hidden_Ms.style.display = "none";
		li_Ms.style.borderBottom = "4px solid transparent";
	}
	// 男士
	li_Men.onmouseover = function(){
		nav_hidden_Ms.style.display = "none";
		li_Ms.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Men.style.display = "block";
		li_Men.style.borderBottom = "4px solid #fab948";
		
		nav_hidden_Children.style.display = "none";
		li_Children.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Gift.style.display = "none";
		li_Gift.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Watch.style.display = "none";
		li_Watch.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Home.style.display = "none";
		li_Home.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fendi.style.display = "none";
		li_Fendi.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Search.style.display = "none";
		li_Search.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fis.style.display = "none";
		li_Fis.style.borderBottom = "4px solid transparent";
	}
	
	li_Men_block.onmouseout = function(){
		nav_hidden_Men.style.display = "none";
		li_Men.style.borderBottom = "4px solid transparent";
	}
	
	//童装
	li_Children.onmouseover = function(){
		nav_hidden_Ms.style.display = "none";
		li_Ms.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Men.style.display = "none";
		li_Men.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Children.style.display = "flex";
		li_Children.style.borderBottom = "4px solid #fab948";
		
		nav_hidden_Gift.style.display = "none";
		li_Gift.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Watch.style.display = "none";
		li_Watch.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Home.style.display = "none";
		li_Home.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fendi.style.display = "none";
		li_Fendi.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Search.style.display = "none";
		li_Search.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fis.style.display = "none";
		li_Fis.style.borderBottom = "4px solid transparent";
	}
	
	li_Children_block.onmouseout = function(){
		nav_hidden_Children.style.display = "none";
		li_Children.style.borderBottom = "4px solid transparent";
	}
	
	// 赠礼
	li_Gift.onmouseover = function(){
		nav_hidden_Ms.style.display = "none";
		li_Ms.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Men.style.display = "none";
		li_Men.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Children.style.display = "none";
		li_Children.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Gift.style.display = "flex";
		li_Gift.style.borderBottom = "4px solid #fab948";
		
		nav_hidden_Watch.style.display = "none";
		li_Watch.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Home.style.display = "none";
		li_Home.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fendi.style.display = "none";
		li_Fendi.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Search.style.display = "none";
		li_Search.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fis.style.display = "none";
		li_Fis.style.borderBottom = "4px solid transparent";
	}
	
	li_Gift_block.onmouseout = function(){
		nav_hidden_Gift.style.display = "none";
		li_Gift.style.borderBottom = "4px solid transparent";
	}
	
	// 腕表
	li_Watch.onmouseover = function(){
		nav_hidden_Ms.style.display = "none";
		li_Ms.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Men.style.display = "none";
		li_Men.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Children.style.display = "none";
		li_Children.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Gift.style.display = "none";
		li_Gift.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Watch.style.display = "flex";
		li_Watch.style.borderBottom = "4px solid #fab948";
		
		nav_hidden_Home.style.display = "none";
		li_Home.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fendi.style.display = "none";
		li_Fendi.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Search.style.display = "none";
		li_Search.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fis.style.display = "none";
		li_Fis.style.borderBottom = "4px solid transparent";
	}
	
	li_Watch_block.onmouseout = function(){
		nav_hidden_Watch.style.display = "none";
		li_Watch.style.borderBottom = "4px solid transparent";
	}
	
	// 家居
	li_Home.onmouseover = function(){
		nav_hidden_Ms.style.display = "none";
		li_Ms.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Men.style.display = "none";
		li_Men.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Children.style.display = "none";
		li_Children.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Gift.style.display = "none";
		li_Gift.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Watch.style.display = "none";
		li_Watch.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Home.style.display = "flex";
		li_Home.style.borderBottom = "4px solid #fab948";
		
		nav_hidden_Fendi.style.display = "none";
		li_Fendi.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Search.style.display = "none";
		li_Search.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fis.style.display = "none";
		li_Fis.style.borderBottom = "4px solid transparent";
	}
	
	li_Home_block.onmouseout = function(){
		nav_hidden_Home.style.display = "none";
		li_Home.style.borderBottom = "4px solid transparent";
	}
	
	// fendi
	li_Fendi.onmouseover = function(){
		nav_hidden_Ms.style.display = "none";
		li_Ms.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Men.style.display = "none";
		li_Men.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Children.style.display = "none";
		li_Children.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Gift.style.display = "none";
		li_Gift.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Watch.style.display = "none";
		li_Watch.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Home.style.display = "none";
		li_Home.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fendi.style.display = "flex";
		li_Fendi.style.borderBottom = "4px solid #fab948";
		
		nav_hidden_Search.style.display = "none";
		li_Search.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fis.style.display = "none";
		li_Fis.style.borderBottom = "4px solid transparent";
	}
	
	li_Fendi_block.onmouseout = function(){
		nav_hidden_Fendi.style.display = "none";
		li_Fendi.style.borderBottom = "4px solid transparent";
	}
	
	// 寻找精品
	li_Search.onmouseover = function(){
		nav_hidden_Ms.style.display = "none";
		li_Ms.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Men.style.display = "none";
		li_Men.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Children.style.display = "none";
		li_Children.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Gift.style.display = "none";
		li_Gift.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Watch.style.display = "none";
		li_Watch.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Home.style.display = "none";
		li_Home.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fendi.style.display = "none";
		li_Fendi.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Search.style.display = "block";
		li_Search.style.borderBottom = "4px solid #fab948";
		
		nav_hidden_Fis.style.display = "none";
		li_Fis.style.borderBottom = "4px solid transparent";
	}
	
	li_Search_block.onmouseout = function(){
		nav_hidden_Search.style.display = "none";
		li_Search.style.borderBottom = "4px solid transparent";
	}
	
	// fis
	li_Fis.onmouseover = function(){
		nav_hidden_Ms.style.display = "none";
		li_Ms.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Men.style.display = "none";
		li_Men.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Children.style.display = "none";
		li_Children.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Gift.style.display = "none";
		li_Gift.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Watch.style.display = "none";
		li_Watch.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Home.style.display = "none";
		li_Home.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fendi.style.display = "none";
		li_Fendi.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Search.style.display = "none";
		li_Search.style.borderBottom = "4px solid transparent";
		
		nav_hidden_Fis.style.display = "flex";
		li_Fis.style.borderBottom = "4px solid #fab948";
	}
	
	li_Fis_block.onmouseout = function(){
		nav_hidden_Fis.style.display = "none";
		li_Fis.style.borderBottom = "4px solid transparent";
	}
	
}


