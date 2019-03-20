// pages/order/order.js
const app = getApp()
var Bmob = require('../../utils/bmob.js')
var that;
var Order = Bmob.Object.extend("Order")
var query = new Bmob.Query(Order)

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    inputShown: false,
    inputContent: "",
    src: '',
    //isEmpty: false,
    orderList: [],
    searchValues: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //委托给that
    that = this
    var current_user = Bmob.User.current();
    if (current_user){
      this.setData({
        src: current_user.get("userPic")
      })
    }
    
    //查询所有数据
    query.find({
      success: function(results) {
        console.log("共查询到 " + results.length + " 条记录");
        that.setData({
          hidden: true
        })
        if(results.length > 0) {
          // 循环处理查询到的数据
          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            console.log(object.id + ' - ' + object.get('goodName'));
          }
          console.log("查询到的数据为：", results);
          that.setData({
            orderList : results
          })
        }
        
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    })
  },

  /**
   * 事件处理
   */
  onAddClick: function (){
    wx.navigateTo({
      url: '/pages/edit/edit',
    })
  },

  onItemClick: function (e) {
    console.log(e)
    var id = e.target.dataset.id;
    //console.log("点击item", id)
    wx.navigateTo({
      url: '/pages/detail/detail?orderId=' + id,
    })
  },

  showInput: function () {
    that.setData({
      inputShown: true
    })
  },

  hideInput: function () {
    that.setData({
      inputContent: "",
      inputShown: false
    })
  },

  clearInputContent: function () {
    that.setData({
      inputContent: ""
    })
  },

  onInputChanged: function (e) {
    console.log('搜索框输入的内容：', e.detail.value)
    var content = e.detail.value
    that.setData({
      inputContent: content
    })
  },

  //点击开始搜索
  onInputConfirmed: function (e) {
    console.log('开始搜索内容：',e.detail.value)
    var content = e.detail.value
    query.equalTo("customer", content)
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(object.id + ' - ' + object.get('title'));
        }
        that.setData({
          searchValues: results
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    })
  },

  onSearchResultClick: function (e) {
    var id = e.target.dataset.id
    console.log("点击搜索结果item", id)
    wx.navigateTo({
      url: '/pages/detail/detail?orderId=' + id,
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

  changeData: function (msg) {
    console.log("刷新数据了～",msg)
    if(msg == "refresh"){

    }
    that.onLoad()
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
  
  }
})