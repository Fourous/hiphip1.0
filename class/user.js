var utils = require("../utils/utils");
class User {

  //构造函数，获取User的简要信息
  constructor(userInfo) {
    this.nickname = userInfo['nickname'];
    this.avatarUrl = userInfo['avatarUrl'];
    this.extend = userInfo['extend'];
  }

  getOpenId(code,callback, appId, appSecret) {
    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + appSecret + '&js_code=' + code + '&grant_type=authorization_code';
    utils.http(url, this.saveUserInfo.bind(this));
    console.log('那这里呢？')
  }

  //回调函数保存数据
  saveUserInfo(data) {
    var user = {};
    user.openid = data.openid;
    user.nickname = this.nickname;
    user.avatarUrl= this.avatarUrl;
    user.extend = this.extend;
   //  wx.setStorage({
   //    key: 'UserInfo',
   //    data: user
   //  })
   // console.log(user.openid)
   // console.log('进行到这里啦');
   // 请求数据库
    var url = 'http://localhost/my_php/userInfo.php';
    wx.request({
      url: url,
      method: 'POST',
      data: {
         'nickname':this.nickname,
         'avatarUrl':this.avatarUrl,
         'openid':data.openid
      },
      header: {
         'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('请求成功啦')
        console.log(res);
        if(res.data.balance){
           user.balance = res.data.balance;
        }
        wx.setStorage({
           key: 'userInfo',
           data: user
        })
      console.log('设置缓存完成');
      //   user.balance= res.data.balance;
      //   if (res.data) {
      //     wx.setStorage({
      //       key: 'UserInfo',
      //       data: true
      //     })
      //   }
         // wx.setStorage({
         //    key: 'UserInfo',
         //    data: user
         // })
      },
      fail: function(){
         console.log('录入失败！')
      }
    })
   console.log('请求结束');
  }
}
export { User }