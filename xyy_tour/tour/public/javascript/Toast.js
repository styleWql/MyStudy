;(function() {
	var _global;
	_global = function() {
		return this;
	}()

	function Toast(selector, txt, duration, callback) {
		this.element = document.querySelector(selector);
		this.txt = txt || "默认文字";
		this.duration=typeof duration=='number'?duration:1000
		this.callback=typeof duration=='function'?duration: typeof callback=='function'?callback:function(){}
		this.init();
	}

	Toast.prototype.init = function() {
			this.element.style.display = "block";
			this.element.innerHTML = this.txt;

			// 定时器获取当前this的问题
			// 1. 使用bind改变this的指向
			// setTimeout(function() {
			// 	this.element.style.display = "none";
			// 	this.callback();
			// }.bind(this), this.duration);
			// 2.使用箭头函数
			// setTimeout(() => {
			// 	this.element.style.display = "none";
			// 	this.callback();
			// },this.duration);
			// 3.使用立即执行函数
			// ;(function(obj){
			// 	setTimeout(function() {
			// 		obj.element.style.display = "none";
			// 		obj.callback();
			// 	},obj.duration)
			// })(this)
			// 4.使用闭包
			setTimeout(function(obj) {
				return function(){
					obj.element.style.display = "none";
					obj.callback();
				}
			}(this), this.duration);
		};

		!('Toast' in _global) && (_global.Toast=Toast);

})()
