// miniprogram/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: ""
  },

  handleUsername(e) { //用户框输入时触发的函数
    this.setData({
      username: e.detail.value
    })
  },

  handlePassword(e) { //密码框输入时触发的函数
    this.setData({
      password: e.detail.value
    })
  },

  handleSubmit() { //登录的函数
    if (this.data.username === "" || this.data.password === "") {
      wx.showToast({
        title: "用户名或密码为空！",
        icon:"none"
      })
    } else {
      wx.cloud.callFunction({
        name: "maizuo_login",
        data: {
          action: "login",
          username: this.data.username,
          password: this.data.password
        }
      }).then((res) => {
        if (res.result.data.length > 0) {
          wx.switchTab({
            url: "/pages/films/films"
          })
          wx.showToast({
            title: "登录成功！",
            success: () => {
              this.setData({
                username: "",
                password: ""
              })
            }
          })
        } else {
          wx.showToast({
            title: "登录失败！",
            success: () => {
              this.setData({
                username: "",
                password: ""
              })
            },
            icon: "none"
          })
        }
      }) //调用云函数
    }

  }
})