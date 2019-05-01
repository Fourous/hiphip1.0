Page({
   data: {
      bgimg: "",
      articles: [{
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
   onLoad: function(options) {
      // 生命周期函数--监听页面加载
      var that = this;
      wx.request({
         url: 'http://localhost/my_php/bgpic.php',
         method: 'POSt',
         data: {
            'mes':1
         },
         header: {
            "Content-Type": "application/x-www-form-urlencoded"
         },
         success: function(res) {
            console.log(res)
            that.setData({
               bgimg: res.data.bgimg
            });
         },
         fail: function(res) {
            console.log(res)
         }
      })
   },
   onReady: function() {
      // 生命周期函数--监听页面初次渲染完成
   },
   onShow: function() {
      // 生命周期函数--监听页面显示
   },
   onHide: function() {
      // 生命周期函数--监听页面隐藏
   },
   onUnload: function() {
      // 生命周期函数--监听页面卸载
   },
   onPullDownRefresh: function() {
      // 页面相关事件处理函数--监听用户下拉动作
   },
   onReachBottom: function() {
      // 页面上拉触底事件的处理函数
   },
   onShareAppMessage: function() {
      // 用户点击右上角分享
      return {
         title: 'title', // 分享标题
         desc: 'desc', // 分享描述
         path: 'path' // 分享路径
      }
   },
   goToArticleD: function(res) {
      wx.navigateTo({
         url: '../article_detail/article_detail?type=0&id=' + res.target.dataset.id,
      })
   }
})