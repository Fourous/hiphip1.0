Page({
   data: {
     adv:{
       id:1,
       title:'公司的形象计划',
      text: '为了更好地提升公司形象，加强宣传力度，为公司的经营和发展创造良好的条件，为更突出展示我公司的规模与实力，更好地展示公司的对外形象，江苏超凡清洗机械有限公司官方网站h于近日顺利升级改版完成，使网站内容更加丰富、更新更加及时。'
     }
   },
   onLoad: function (options) {
      // 生命周期函数--监听页面加载
      //console.log(options);
      var id= options.id;
      var that= this;
     wx.request({
       url: 'http://localhost/my_php/advertise.php',
       method: 'POST',
       data: {
         'id': id
       },
       header: {
         'content-type': 'application/x-www-form-urlencoded'
       },
       success: function (e) {
         //console.log(e);
         that.adv= e.data[0];
         //console.log(that.adv);
         that.setData({
           adv: that.adv
         });
       }
     })
   },
   onReady: function () {
      // 生命周期函数--监听页面初次渲染完成
   },
   onShow: function () {
      // 生命周期函数--监听页面显示
   },
   onHide: function () {
      // 生命周期函数--监听页面隐藏
   },
   onUnload: function () {
      // 生命周期函数--监听页面卸载
   },
   onPullDownRefresh: function () {
      // 页面相关事件处理函数--监听用户下拉动作
   },
   onReachBottom: function () {
      // 页面上拉触底事件的处理函数
   },
   onShareAppMessage: function () {
      // 用户点击右上角分享
      return {
         title: 'title', // 分享标题
         desc: 'desc', // 分享描述
         path: 'path' // 分享路径
      }
   }
})