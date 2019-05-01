
Page({

   /**
    * 页面的初始数据
    */
   data: {
      openId:'',
      type: '',
      id: '',
      goods: [{
         good: [{
            package:0,
            title: "雷柏VG500 RGB机械键盘",
            srcs:[
               '../../imges/swiper_1.png',
               '../../imges/swiper_1.png',
               '../../imges/swiper_1.png'
            ],
            packages:[
               "官方配置",
               "套餐一",
               "套餐二"
            ],
            prices:[
               1,
               2,
               3
            ],
            price: 1,
            VIPPrice: 0.5,
            comments:[
               {
                  comment:'套餐配置不错，非常好。服务质量满意，物流效率高，速度快。',
                  time: '2018-05-14'
               }, {
                  comment: '外观好看，也很小巧，非常适合女孩子，但是做工不够细致，而且有待加强。都是塑料只是一个贴片。',
                  time: '2018-05-14'
               }, {
                  comment: '音质也非常不错，总体来说，除了材质问题，别的都非常喜欢，对了还有线的的质量问题。',
                  time: '2018-05-14'
               }, {
                  comment: '特别细，感觉不结实，用着试试看吧。',
                  time: '2018-05-14'
               }, {
                  comment: '物流效率高。',
                  time: '2018-05-14'
               }
            ]
         },
         {
            package: 0,
            title: "雷柏VG500 RGB机械键盘",
            srcs: [
               '../../imges/swiper_1.png',
               '../../imges/swiper_1.png',
               '../../imges/swiper_1.png'
            ],
            packages: [
               "官方配置",
               "套餐一",
               "套餐二"
            ],
            prices: [
               1,
               2,
               3
            ],
            price: 1,
            VIPPrice: 0.5
         },
         ]
      }, {
         good: [{
            package:0,
            srcs: [
               '../../imges/swiper_2.png',
               '../../imges/swiper_1.png'
            ],
            title: "雷柏VG500 RGB机械键盘",
            packages: [
               "官方配置",
               "套餐一",
               "套餐二"
            ],
            prices: [
               1,
               2,
               3
            ],
            price: 1,
            VIPPrice: 0.5
         },
         {
            package:0,
            srcs:[
               '../../imges/swiper_2.png',
               '../../imges/swiper_1.png'
            ],
            title: "雷柏VG500 RGB机械键盘",
            packages: [
               "官方配置",
               "套餐一",
               "套餐二"
            ],
            prices: [
               1,
               2,
               3
            ],
            price: 1,
            VIPPrice: 0.5
         },
         {
            package:0,
            srcs: [
               '../../imges/swiper_2.png',
               '../../imges/swiper_1.png'
            ],
            title: "雷柏VG500 RGB机械键盘",
            packages: [
               "官方配置",
               "套餐一",
               "套餐二"
            ],
            prices: [
               1,
               2,
               3
            ],
            price: 1,
            VIPPrice: 0.5
         }
         ]
      }]
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
     var that= this;
      this.data.type= options.type;
      this.data.id= options.id;
      this.setData({
         type:this.data.type,
         id:this.data.id
      })
      console.log(this.data.id)
      wx.request({
        url: 'http://localhost/my_php/goodDetail.php',
        method: 'POST',
        data:{
          'goodId':this.data.id
        },
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(e){
          console.log(e);
          that.setData({
            goods:e.data
          });
        },
        fail: function(e){
          console.log(e);
        }
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
   onShareAppMessage: function (options) {
    console.log(options)
     return {
       title: this.data.goods.title,
       success(res) {
         console.log(res.shareTickets[0]) // 奇怪为什么 shareTickets 是个数组？这个数组永远只有一个值。
       }
     }
   },
   changePackage: function(e){
      //console.log(e);
      var type= e.currentTarget.dataset.type;
      var id= e.currentTarget.dataset.id;
      var goods= this.data.goods;
      var value= e.detail.value;
      // goods[type].good[id].package= value;
      // goods[type].good[id].price = goods[type].good[id].prices[value];
      // goods[type].good[id].VIPPrice = goods[type].good[id].price * 0.8;
      goods.package = value;
      this.setData({
         goods:goods
      })
   },
   navigateToCart:function(){
      wx.switchTab({
         url: '../cart/cart',
      })
   },
  addCart: function (e) {
    //console.log(e);
    var goodId= e.currentTarget.dataset.id;
    console.log(goodId);
    var mes= 1;
    var that= this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        //.log(res);
        that.setData({
          openId:res.data.openid
        });
        //console.log(that.data.openId);
        wx.request({
          url: 'http://localhost/my_php/usercart.php',
          method:"POST",
          data:{
            "mes":mes,
            "openId":that.data.openId,
            "goodId":goodId
          },
          header:{
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(e){
            wx.showToast({
              title: e.data.msg,
              icon:'none'
            })
          },
          fail: function(e){
            console.log(e);
          }
        })
      },
    })
  }
})