// pages/shcarticle/shcarticle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   articlelist:[
      {
         id: 1,
         title: "今天你吃对了吗？",
         content: "众多周知，我们生活中有很多饮食习惯，影响着我们的生活的放放面面，所以我们的饮食习惯将决定我们的生活和健康，这是非常重要的。",

      },
      {
         id: 2,
         title: "今天你吃对了吗？",
         content: "众多周知，我们生活中有很多饮食习惯，影响着我们的生活的放放面面，所以我们的饮食习惯将决定我们的生活和健康，这是非常重要的。",

      },
      {
         id: 3,
         title: "今天你吃对了吗？",
         content: "众多周知，我们生活中有很多饮食习惯，影响着我们的生活的放放面面，所以我们的饮食习惯将决定我们的生活和健康，这是非常重要的。",

      },
      {
         id: 4,
         title: "今天你吃对了吗？",
         content: "众多周知，我们生活中有很多饮食习惯，影响着我们的生活的放放面面，所以我们的饮食习惯将决定我们的生活和健康，这是非常重要的。",

      },
      {
         id: 5,
         title: "今天你吃对了吗？",
         content: "众多周知，我们生活中有很多饮食习惯，影响着我们的生活的放放面面，所以我们的饮食习惯将决定我们的生活和健康，这是非常重要的。",

      }
   ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  goToArticleD: function (res) {
     console.log(res)
     wx.navigateTo({
        url: '../article_detail/article_detail?type=1&id='+ res.currentTarget.dataset.id,
     })
  }
})