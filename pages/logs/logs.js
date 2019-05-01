//logs.js
const util = require('../../utils/util.js')
var app= getApp();
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }, onGotUserInfo: function (e) {
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
              // that.getOpenId(code, appId, appSecret, userInfo);
              //   wx.switchTab({
              //      url: '../index/index',
              //   })
              that.getUser(userInfo);
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
           //that.getUser(userInfo);
        },
        fail: function () {
           console.log('请求openID失败');
        }
     })
  },
  getUser: function (userInfo) {
     //console.log(userInfo)
     userInfo.balance = 0;
     //userInfo.openid = openid;
     console.log(userInfo);
     wx.setStorage({
        key: 'userInfo',
        data: userInfo,
     })

     wx.switchTab({
        url: '../index/index',
     })
  },
  sqlData: function (openid, userInfo) {
     console.log(openid);
     console.log(userInfo);
     var that = this;
     //   wx.request({
     //      url: 'http://localhost/my_php/userInfo.php',
     //      method: 'POST',
     //      data: {
     //         'nickname': userInfo.nickName,
     //         'avatarUrl': userInfo.avatarUrl,
     //         'openid': openid
     //      },
     //      header: {
     //         'content-type': 'application/x-www-form-urlencoded'
     //      },
     //      success: function (res) {
     //         console.log(res);
     //         if (res.data.balance) {
     //            userInfo.balance = res.data.balance;
     //            userInfo.openid = openid;
     //            console.log(userInfo);
     //            wx.setStorage({
     //               key: 'userInfo',
     //               data: userInfo,
     //            })
     //         }
     //         that.setData({
     //            userInfo: userInfo,
     //            quanxian: 1
     //         });
     //       wx.switchTab({
     //          url: '../index/index',
     //       })
     //      },
     //      fail:function(res){
     //         console.log(res);
     //      }
     //   })
     userInfo.balance = 0;
     //userInfo.openid = openid;
     console.log(userInfo);
     wx.setStorage({
        key: 'userInfo',
        data: userInfo,
     })

     wx.switchTab({
        url: '../index/index',
     })
  }
})
