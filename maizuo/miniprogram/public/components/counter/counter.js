// public/components/counter/counter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: {
      type: [Number, String]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCount(e) { //计算的函数
      console.log(e.target.dataset.type)
      let num = null;
      if (e.target.dataset.type==="add") {
        num = this.properties.num + 1;
      } else {
        num = this.properties.num - 1;
      }
      //调用自定义函数
      this.triggerEvent('handleCount', num);
    }
  },

  lifetimes: { //存放组件自己内部生命周期钩子函数
    ready() {//在组件在视图层布局完成后执行
      console.log("视图层布局已完成!");
    }
  },

  pageLifetimes: { //存放组件所在页面发生改变的时候执行的钩子函数

  }
})