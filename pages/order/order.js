// pages/order/order.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      winHeight:'',
      currentTab:0,
      orders:[
         {
            order:[
               
            ]
         },{
            order:[
               
            ]
         },{
            order:[
               
            ]
         },{
            order:[]
         }
      ]
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      console.log(options);
      var that= this;
      that.setData({
         currentTab: options.tab
      });
      this.setWinHeight(options.tab);
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
   switchTab: function (e) {
      console.log(e);
      this.setData({
         currentTab: e.detail.current
      });
   },
   // 点击标题切换当前页时改变样式
   switchNav: function (e) {
      console.log(e);
      var cur = e.currentTarget.dataset.current;
      this.setWinHeight(cur);
      if (this.data.currentTaB == cur) { return false; }
      else {
         this.setData({
            currentTab: cur
         })
      }
   },
   setWinHeight: function (current) {
      var len = this.data.orders[current].order.length;
      if(len==0){
         this.data.winHeight= 1000;
      }else{
         this.data.winHeight = len * 290;
      }
      this.setData({
         winHeight: this.data.winHeight
      })
   }
})