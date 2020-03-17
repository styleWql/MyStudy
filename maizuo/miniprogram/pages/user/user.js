// pages/user/user.js

//导入
import formatTime from "../../utils/util.js";

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    userInfo: {},
    funList:[
      {
        title:"卖座劵",
        id:+new Date +Math.random()*10,
        iconPath:"/public/image/icon/juan.png"
      },
      {
        title: "组合红包",
        id: +new Date + Math.random() * 10,
        iconPath: "/public/image/icon/redball.png"
      },
      {
        title: "余额",
        id: +new Date + Math.random() * 10,
        iconPath: "/public/image/icon/yue.png",
        money:0
      }, 
      {
        title: "设置",
        id: +new Date + Math.random() * 10,
        iconPath: "/public/image/icon/set.png"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('我已经到底了！')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(obj) {
    return {
      title: '我的页面',
      path: '/page/user/user',
      imageUrl: 'http://p1.music.126.net/Ha3zeAkIThWfYXzUrNl9hQ==/109951164740551479.jpg?imageView&quality=89'
    }
  },

  //触屏事件调用的函数
  handleTab: () => {
    console.log("你触摸了我！")
  },

  //计算的函数
  handleCount(e) {
    console.log(e.target.dataset.type)
    let type = e.target.dataset.type
    let count = null
    if (type === 'add') {
      count = this.data.count + 1
    } else {
      count = this.data.count - 1
    }
    //修改数据,与react类似
    this.setData({
      count
    })
  },
  //js跳转tabBar
  handleJump(){
    wx.navigateTo({
      url: '/pages/index/index?id='+this.data.id,//通过拼接传递参数
      success:(res)=>{//成功的回调
        app.globalData.id = this.data.id//修改全局数据传递参数
        
        //触发index页面的自定义事件
        res.eventChannel.emit("haha", { data: "我是user页传回来的数据！" })
      },
      events:{
        accept(data){//监听一个自定义事件,接收传回来的参数
          console.log(data.data);
        }
      }
    })
  }
})