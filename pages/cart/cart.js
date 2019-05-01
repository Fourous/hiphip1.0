// pages/cart/cart.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      openId:'',
      cartlist: [
         {
            txtStyle:"",
            id: 1,
            num: 1,
            good: {
               picSrc: '../../imges/swiper_1.png',
               title: '雷柏v500 RGB机械键盘',
               type: '机械键盘',
               tc: 0,
               package: [
                  '官方套餐',
                  '套餐一',
                  '套餐二'
               ],
               price: [
                  200,
                  300,
                  400
               ]
            },
            price: 200,
            VIPprice: 180,
            checked: false,
            mode: 0
         },
         {
            txtStyle:"",
            id: 2,
            num: 1,
            good: {
               picSrc: '../../imges/swiper_1.png',
               title: '雷柏v500 RGB机械键盘',
               type: '机械键盘',
               tc: 0,
               package: [
                  '官方套餐',
                  '套餐一',
                  '套餐二'
               ],
               price: [
                  200,
                  300,
                  400
               ]
            },
            price: 200,
            VIPprice: 180,
            checked: false,
            mode: 0
         }
      ],
      totalPrice: 0,
      totalCount: 0,
      isAll: false
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
     console.log("ceshi");
     var mes = 0;
     var that = this;
     wx.getStorage({
       key: 'userInfo',
       success: function (res) {
         console.log(res);
         that.setData({
           openId: res.data.openid
         });
         console.log(that.data.openId);
         wx.request({
           url: 'http://localhost/my_php/usercart.php',
           method: "POST",
           data: {
             "mes": mes,
             "openId": that.data.openId,
           },
           header: {
             'content-type': 'application/x-www-form-urlencoded'
           },
           success: function (e) {
             console.log(e);
             that.setData({
               cartlist:e.data
             });
           },
           fail: function (e) {
             console.log(e);
           }
         })
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
    this.onLoad();
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
   changeMode: function (e) {
      console.log(e);
      var id = e.currentTarget.dataset.id;
      var cartlist = this.data.cartlist;
      console.log(id)
      for (var i = 0; i < cartlist.length; i++) {
         if (cartlist[i].cartId == id) {
            cartlist[i].mode = cartlist[i].mode == 0 ? 1 : 0;
            break;
         }
      }
      console.log("over", cartlist);
      this.setData({
         cartlist: cartlist
      })
   },
   changePackage: function (e) {
      var id = e.currentTarget.dataset.id;
      var cartlist = this.data.cartlist;
      var tc = e.detail.value;
      console.log(id)
      for (var i = 0; i < cartlist.length; i++) {
         if (cartlist[i].cartId == id) {
            cartlist[i].good.package = tc;
            break;
         }
      }
      console.log("over", cartlist);
      this.setData({
         cartlist: cartlist
      })
   },
   addNum: function (e) {
      var id = e.target.dataset.id;
      var cartlist = this.data.cartlist;
      var tc = e.detail.value;
      console.log(id)
      for (var i = 0; i < cartlist.length; i++) {
         if (cartlist[i].cartId == id) {
            if (cartlist[i].num < 10) {
               cartlist[i].num = cartlist[i].num + 1;
            } else {
               wx.showToast({
                  title: "不能再加了"
               })
            }
            cartlist[i].num - 1;
            break;
         }
      }
      console.log("over", cartlist);
      this.setData({
         cartlist: cartlist
      })
   },
   delNum: function (e) {
      var id = e.target.dataset.id;
      var cartlist = this.data.cartlist;
      var tc = e.detail.value;
      console.log(id)
      for (var i = 0; i < cartlist.length; i++) {
         if (cartlist[i].cartId == id) {
            if (cartlist[i].num > 1) {
               cartlist[i].num = cartlist[i].num - 1;
            } else {
               wx.showToast({
                  title: "不能再减了"
               })
            }
            cartlist[i].num - 1;
            break;
         }
      }
      console.log("over", cartlist);
      this.setData({
         cartlist: cartlist
      })
   },
   checkItem: function (e) {
      var id = e.currentTarget.dataset.id;
      var checked = e.detail.value;
      var cartlist = this.data.cartlist;
      for (var i = 0; i < cartlist.length; i++) {
         if (cartlist[i].cartId == id) {
            cartlist[i].checked = 1;
            break;
         }
      }
      this.setData({
         cartlist: cartlist
      })
      this.calcateTotal()
      this.checkIsAll()
   },
   checkAll: function (e) {
      var checked = e.detail.value;
      var cartlist = this.data.cartlist;
      for (var i = 0; i < cartlist.length; i++) {
         cartlist[i].checked = 1;
      }
      this.setData({
         cartlist: cartlist
      })
      this.calcateTotal()
   },
   calcateTotal: function () {
      var cartlist = this.data.cartlist;
      var totalPrice = 0;
      for (var i = 0; i < cartlist.length; i++) {
         if (cartlist[i].checked) {
           var temp = cartlist[i].good.orVIP ? cartlist[i].good.vipPrices[cartlist[i].good.package] : cartlist[i].good.prices[cartlist[i].good.package];
            totalPrice += temp * cartlist[i].num;
         }
      }
      this.setData({
         totalPrice: totalPrice
      })
   },
   checkIsAll: function () {
      var cartlist = this.data.cartlist;
      var isAll = cartlist.length != 0 ? true : false;
      for (var i = 0; i < cartlist.length; i++) {
         if (cartlist[i].checked == false) {
            isAll = false;
            break;
         }
      }
      this.setData({
         isAll: isAll
      })
   },
   changeItem: function(e){
     console.log(e);
     var id = e.currentTarget.dataset.id;
     var cartlist = this.data.cartlist;
     console.log(id)
     for (var i = 0; i < cartlist.length; i++) {
       if (cartlist[i].cartId == id) {
         cartlist[i].checked = cartlist[i].checked == 0 ? 1 : 0;
         break;
       }
     }
     console.log("over", cartlist);
     this.setData({
       cartlist: cartlist
     })
     this.calcateTotal()
     this.checkIsAll()
   },
   touchS: function (e) {

      if (e.touches.length == 1) {

         this.setData({

            //设置触摸起始点水平方向位置

            startX: e.touches[0].clientX

         });

      }

   },
   touchM: function (e) {
      if (e.touches.length == 1) {
         //手指移动时水平方向位置
         var moveX = e.touches[0].clientX;
          //手指起始点位置与移动期间的差值
         var disX = this.data.startX - moveX;
         var delBtnWidth = 180;
         var txtStyle = "";
         if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
            txtStyle = "left:0px";
         } else
            if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
               txtStyle = "left:-" + disX + "rpx";
               if (disX >= delBtnWidth) {
                  //控制手指移动距离最大值为删除按钮的宽度
                  txtStyle = "left:-" + delBtnWidth + "rpx";
               }
            }
         //获取手指触摸的是哪一项
         var index = e.currentTarget.dataset.index;
         var cartlist = this.data.cartlist;
         cartlist[index].txtStyle = txtStyle;
         //更新列表的状态
         this.setData({
            cartlist: cartlist
         });
      }
   },
   touchE: function (e) {
      if (e.changedTouches.length == 1) {
         //手指移动结束后水平位置
         var endX = e.changedTouches[0].clientX;
         //触摸开始与结束，手指移动的距离
         var disX = this.data.startX - endX;
         var delBtnWidth = 180;
         //如果距离小于删除按钮的1/2，不显示删除按钮
         var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0px";
         //获取手指触摸的是哪一项
         var index = e.currentTarget.dataset.index;
         var cartlist = this.data.cartlist;
         cartlist[index].txtStyle = txtStyle;
         //更新列表的状态
         this.setData({
            cartlist: cartlist
         });
      }
   }
})