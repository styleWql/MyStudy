// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

// 导入全局变量
var { globalData } = getApp();//解构

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerObj: {
      "status": 0,
      "data": [{
          "bannerId": 247,
          "actionType": 2,
          "actionData": "{\"url\":\"https://m.maizuo.com/mz-act/brand/groupon/sUnSV582yL?partnerId=mz\u0026co=mzmovie\"}",
          "imgUrl": "https://static.maizuo.com/v5/upload/c59274dc30989e9a374adc64ff567da4.jpg",
          "masterTitle": "",
          "slaveTitle": "",
          "displayOrder": 0,
          "bindBusinessId": "",
          "cityIds": "310100",
          "name": "上海万达邀您特惠观影",
          "displayTimes": 0,
          "slaveImgUrl": "",
          "startTime": "1571932800",
          "endTime": "1581091199",
          "businessId": ""
        },
        {
          "bannerId": 326,
          "actionType": 22,
          "actionData": "{\"businessId\":\"4917\"}",
          "imgUrl": "https://static.maizuo.com/v5/upload/b27e2f1ca2c7e6c2748f78131855bfc5.jpg",
          "masterTitle": "",
          "slaveTitle": "",
          "displayOrder": 0,
          "bindBusinessId": "",
          "cityIds": "0",
          "name": "天气之子",
          "displayTimes": 0,
          "slaveImgUrl": "",
          "startTime": "1572537600",
          "endTime": "1573228799",
          "businessId": ""
        },
        {
          "bannerId": 327,
          "actionType": 22,
          "actionData": "{\"businessId\":\"4918\"}",
          "imgUrl": "https://static.maizuo.com/v5/upload/b93301a27c59f90ecd860f6501900d15.jpg",
          "masterTitle": "",
          "slaveTitle": "",
          "displayOrder": 0,
          "bindBusinessId": "",
          "cityIds": "0",
          "name": "终结者：黑暗命运",
          "displayTimes": 0,
          "slaveImgUrl": "",
          "startTime": "1572537600",
          "endTime": "1573228799",
          "businessId": ""
        }
      ],
      "msg": "success"
    },
    city: "",
    filmList: [],
    filmParams: {
      cityId: "",
      pageNum: 1,
      pageSize: 10,
      type: 1 //1 正在 2 即将
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //页面加载的时候获取地理信息

    // 实例化API核心类
    let qqmapsdk = new QQMapWX({
      key: 'SJ7BZ-6EVCW-4VMRI-R4V4L-PISY3-OOB7B'
    });

    // 赋值this
    let that = this;

    //如果city有值了就不用再重新赋值了
    if (!this.data.city) {
      wx.getLocation({ //获取用户地理位置信息
        success(res) { //成功的回调  拿到了精度，通过腾讯的api去 反查地理位置信息
          // console.log(res)

          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success({
              result
            }) {//解构
              // console.log(result);
              that.setData({
                city: result.ad_info.city
              })
              that.data.filmParams.cityId = result.ad_info.city_code
              //发送请求
              that.getFilmList(that.data.filmParams)
            }
          })

        },
        fail() { //失败的回调
          console.log("获取地理位置失败！")
          // 设置默认的城市
          that.data.filmParams.cityId = "510100"
          //发送请求
          that.getFilmList(that.data.filmParams)
        }
      })
    }

    // tabBar的红点
    wx.showTabBarRedDot({
      index:2
    })

     // tabBar的右上角的文字提示
    wx.setTabBarBadge({
      index:3,
      text:"3"
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
    //做下拉刷新，初始化pageNum

    this.data.filmParams.pageNum = 1;
    //发送请求
    this.getFilmList(this.data.filmParams)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    //做下拉刷新，初始化pageNum

    this.data.filmParams.pageNum += 1;
    //发送请求
    this.getFilmList(this.data.filmParams,true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  handleImg() { //图片加载成功时的函数
    console.log('图片加载成功！')
  },

  handleImgError() { //图片加载失败时的函数
    console.log('图片加载失败！')
  },

  handleMove(e) { //移动时调用的函数
    console.log(e)
  },

  handleOpenLoction() { //使用微信内置地图查看位置

    wx.openLocation({
      latitude: 30.537,
      longitude: 104.055,
      name: "知了堂全球总部",
      address: "成都市武侯区天府软件园G8",
      success() { //成功的回调
        console.log("微信内置地图查看位置成功了！")
      },
      fail() { //失败的回调
        console.log("微信内置地图查看位置失败了！")
      }
    })
  },

  SelectLocation(){//选择位置的函数
    wx.chooseLocation({
      success(res) {
        console.log(res);
      }
    })
   
  },

  handleNavChange(e){//切换nav导航
    this.setData({
      'filmParams.type':e.target.dataset.type
    },()=>{//setData可以接回调函数
      //发送请求
      this.getFilmList(this.data.filmParams)
    })
  },

  handleDetail(e){//点击查看详情的函数
    console.log(e.target.dataset.film)
    //在微信小程序里面可以存对象
    // wx.setStorageSync  同步
    //wx.setStorage  异步
    wx.navigateTo({
      url: '/pages/detail/detail',
      success(){
        wx.setStorageSync("filmId", { filmId: e.target.dataset.film.filmId })
      }
    })
    
  },

  //获取数据发送请求
  getFilmList(filmParams, more = false) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    // 去用云函数获取数据
    wx.cloud.callFunction({
      name: "film",
      data: {
        action:"get",
        filmParams: filmParams
      }
    }).then((res) => {
      console.log(res);
      if (more) {
        this.setData({
          filmList: [...this.data.filmList, ...res.result.data,]
        })

      } else {
        this.setData({
          filmList: res.result.data
        })
      }
      wx.hideLoading();
    }) //调用云函数

    // wx.request({
    //   url: globalData.url + '/api/filmlist',
    //   data: filmParams,
    //   success: (res) => {
    //     if (more) {
    //       this.setData({
    //         filmList: [...this.data.filmList, ...res.data.data.films,]
    //       })

    //     } else {
    //       this.setData({
    //         filmList: res.data.data.films
    //       })
    //     }

    //   },
    //   complete() {
    //     wx.hideLoading()
    //   }
    // })

  },


})