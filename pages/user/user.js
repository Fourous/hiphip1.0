// pages/user/user.js
import { User } from "../../class/user.js"
var app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
      userInfo: {
      },
      balance: 0.00,
      quanxian: 0
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      var that = this
      // //调用应用实例的方法获取全局数据
      // app.getUserInfo(function (userInfo) {
      //   //更新数据
      //   console.log("获取用户信息成功!")
      //   console.log(userInfo)
      //   that.setData({
      //     userInfo: userInfo
      //   })
      // })
      // 
      wx.getStorage({
         key: 'userInfo',
         success: function (res) {
            console.log(res)
            that.setData({
               userInfo: res.data,
               quanxian: 1
            })
         },
      })
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
   goToAddr: function () {
      wx.navigateTo({
         url: '../address/address',
      })
   },
   navigateToAbout: function () {
      wx.navigateTo({
         url: '../about/about',
      })
   },
   navigateToUserInfo: function () {
      wx.navigateTo({
         url: '../userInfo/userInfo?avatarUrl=' + this.data.userInfo.avatarUrl + '&nickname=' + this.data.userInfo.nickname,
      })
   },
   navigateToRecharge: function () {
      wx.navigateTo({
         url: '../recharge/recharge',
      })
   },
   onGotUserInfo: function (e) {
      console.log(e.detail.userInfo)
      var that = this;
      //获取必要的变量
      var userInfo = e.detail.userInfo;
      var appId = app.globalData.g_appID;
      var appSecret = app.globalData.g_appSecret;
      wx.login({
         success: function (res) {
            console.log(res);
            var code = res.code;
            if (code) {
               that.getOpenId(code, appId, appSecret, userInfo);
            }
         },
         fail: function () {
            console.log('登录失败！');
         }
      })
   },
   getOpenId: function (code, appId, appSecret, userInfo) {
      var that = this;
      var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + appSecret + '&js_code=' + code + '&grant_type=authorization_code';
      wx.request({
         url: url,
         method: 'GET',
         data: '',
         header: {
            'content-type': 'application/json'
         },
         success: function (res) {
            console.log(res.data);
            var openid = res.data.openid;
            that.sqlData(openid, userInfo);
         },
         fail: function () {
            console.log('请求openID失败');
         }
      })
   },
   sqlData: function (openid, userInfo) {
      console.log(openid);
      console.log(userInfo);
      var that = this;
      wx.request({
         url: 'http://localhost/my_php/userInfo.php',
         method: 'POST',
         data: {
            'nickname': userInfo.nickName,
            'avatarUrl': userInfo.avatarUrl,
            'openid': openid
         },
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log(res);
            if (res.data.balance) {
               userInfo.balance = res.data.balance;
               userInfo.openid= openid;
               console.log(userInfo);
               wx.setStorage({
                  key: 'userInfo',
                  data: userInfo,
               })
            }
            that.setData({
               userInfo:userInfo,
               quanxian:1
            });
         }
      })
   },
   navigateToOrder:function(){
      wx.navigateTo({
         url: '../order/order?tab=0',
      })
   },
   navigateToDeli:function(){
      wx.navigateTo({
         url: '../order/order?tab=1',
      })
   },
   navigateToRece: function () {
      wx.navigateTo({
         url: '../order/order?tab=2',
      })
   },
   navigateToComm: function () {
      wx.navigateTo({
         url: '../order/order?tab=3',
      })
   },
   navigeteToShc:function(){
      wx.navigateTo({
         url: '../shcarticle/shcarticle',
      })
   }
})