// pages/cinema/cinema.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:"",
    urls: ["http://hbimg.b0.upaiyun.com/bcbc3add295592a1b2f57a20c5793f75a5dc0c8f31ceb-H2FmaZ_fw658", "https://static.maizuo.com/v5/upload/c59274dc30989e9a374adc64ff567da4.jpg", "https://static.maizuo.com/v5/upload/b27e2f1ca2c7e6c2748f78131855bfc5.jpg"],//预览的图片数组
    current:''//当前预览的图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 隐藏转发按钮
    // wx.hideShareMenu()
    
    //显示转发按钮
    wx.showShareMenu()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //选择图片的函数
  chooseImg(){
    wx.chooseImage({
      count:1,
      success:(res)=>{
        this.setData({
          imgUrl: res.tempFilePaths
        })
      }
    })
  },

  //点击预览图片
  handleView(e){
    wx.previewImage({
      urls:this.data.urls,
      current:e.target.dataset.img
    })
  },

  //选择收货地址
  handleAddress(){
    wx.chooseAddress({
      success:(res)=>{
        console.log(res);
      }
    })
  },

  //打电话
  handleCall(){
    wx.makePhoneCall({
      phoneNumber:"18188451785",
      success(res){
        console.log(res)
      }
    })
  },

  // 扫码
  handleScanCode(){
    wx.scanCode({
      success(res){
        console.log(res);
      }
    })
  },

  //振动
  handlebrate(){
    wx.vibrateLong()
  },

  //运动
  handleRun(){
    wx.login({
      success(res){
        console.log(res)
      }
    });
    wx.getWeRunData({
      success(res) {
        console.log(res)
      }
    });
  }
})