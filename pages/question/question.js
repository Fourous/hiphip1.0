// pages/question/question.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:'',
    questionMode: 0,
    dates: '1997-08-21'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var questionMode = app.globalData.questionMode;
    that.setData({
      questionMode: questionMode
    });
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
  bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },
  question_sub: function (e) {
    console.log(e);
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          openId:res.data.openid
        });
        wx.request({
          url: 'http://localhost/my_php/question.php',
          method:"POST",
          data:{
            "openId":that.data.openId,
            "name":e.detail.value.user_name,
            "telephone":e.detail.value.user_phone,
            "birthday":e.detail.value.user_bir,
            "address":e.detail.value.user_add,
            "sex":e.detail.value.user_sex
          },
          header:{
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(e){
            console.log(e);
            app.changeQuestionMode(1);
            wx.switchTab({
              url: '../index/index',
            })
          }
        })
      },
    })
    // app.changeQuestionMode(1);
    // wx.switchTab({
    //   url: '../index/index',
    // })
  },
  question_res: function (e) {
  },
  goToQuestion: function () {
    var that= this;
    app.changeQuestionMode(0);
    wx.navigateTo({
      url: '../question/question',
    })
  }
})