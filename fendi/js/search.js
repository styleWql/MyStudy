var woman = document.getElementById("woman");
var man = document.getElementById("man")
var search_goods_woman = document.getElementById("search_goods_woman");
var search_goods_man = document.getElementById("search_goods_man");


woman.onclick = function(){
	woman.style.borderBottomColor = "#F9B949";
	man.style.borderBottomColor = "transparent";
	search_goods_woman.style.display = "block";
	search_goods_man.style.display = "none";
}

man.onclick = function(){
	man.style.borderBottomColor = "#F9B949";
	woman.style.borderBottomColor = "transparent";
	search_goods_woman.style.display = "none";
	search_goods_man.style.display = "block";
}