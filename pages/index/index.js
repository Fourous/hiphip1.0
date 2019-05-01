// pages/cart/cart.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      winHeight: '',
      currentTab: 0,
      scrollLeft: 0,
      imgUrls: [
         "../../imges/swiper_1.png",
         "../../imges/swiper_2.png",
         "../../imges/swiper_3.png"
      ],
      adv:[
        {
          id:1,
          title:'为庆祝本公司的成立，须知'
        },
        {
          id:2,
          title:'为了更好地发展客户'
        }
      ],
      goods: [{
         good: [{
            title: "雷柏VG500 RGB机械键盘",
            price: 1,
            VIPPrice: 0.5
         },
         {
            title: "雷柏VG500 RGB机械键盘",
            price: 1,
            VIPPrice: 0.5
         },
         ]
      }, {
         good: [{
            title: "雷柏VG500 RGB机械键盘",
            price: 1,
            VIPPrice: 0.5
         },
         {
            title: "雷柏VG500 RGB机械键盘",
            price: 1,
            VIPPrice: 0.5
         },
         {
            title: "雷柏VG500 RGB机械键盘",
            price: 1,
            VIPPrice: 0.5
         }
         ]
      }]
   },
   // 滚动切换标签样式
   switchTab: function (e) {
      this.setData({
         currentTab: e.detail.current
      });
      this.checkCor();
   },
   // 点击标题切换当前页时改变样式
   switchNav: function (e) {
      var cur = e.target.dataset.current;
      this.setWinHeight(cur);
      if (this.data.currentTaB == cur) { return false; }
      else {
         this.setData({
            currentTab: cur
         })
      }
   },
   //判断当前滚动超过一屏时，设置tab标题滚动条。
   checkCor: function () {
      if (this.data.currentTab > 3) {
         this.setData({
            scrollLeft: 300
         })
      } else {
         this.setData({
            scrollLeft: 0
         })
      }
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (e) {
      var that = this;
      //this.setWinHeight(0);
      //这是设置好的数据部分请求
      wx.request({
        url: 'http://localhost/my_php/index_item.php',
        data:'',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
         //console.log(res);
         that.setData({
            goods:res.data
         });
        }
      })
      wx.request({
        url: 'http://localhost/my_php/advertise.php',
        method:'POST',
        data:{
          'id':0
        },
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(e){
         //console.log(e);
          that.setData({
            adv:e.data
          });
        }
      })
      this.setWinHeight(0);
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
   navigateToQuestion: function (e) {
      wx.navigateTo({
         url: '../question/question'
      })
   },
   navigateToGood: function (e) {
      var type= e.currentTarget.dataset.type;
      var id= e.currentTarget.dataset.id;
      console.log(type+id);
      wx.navigateTo({
         url: '../goods/goods?type='+type+'&id='+id,
      })
   },
   setWinHeight: function (current) {
      var len = this.data.goods[current].good.length;
      var num;
      if (len % 2 == 1) {
         num = ((len - 1) / 2) + 1;
      } else {
         num = len / 2;
      }
      this.data.winHeight = num * 370;
      this.setData({
         winHeight: this.data.winHeight
      })
   },
   
   navigateToAd:function(e){
      //console.log(e);
      var id= e.currentTarget.dataset.id;
      wx.navigateTo({
         url: '../advertise/advertise?id='+id,
      })
   }
})