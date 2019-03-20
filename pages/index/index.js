//index.js
//获取应用实例
var app = getApp()
var Bmob = require('../../utils/bmob.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    dialogHidden: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      //url: '../logs/logs'
      url: '../order/order'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log('全局用户信息不为空--------')
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      dialogHidden: true
    })
    wx.navigateTo({
      //url: '../logs/logs'
      url: '../order/order'
    })
  },
  showBottomDialog: function(){
    this.setData({
      dialogHidden: false
    })
  },
  onDialogDismiss: function(){
    this.setData({
      dialogHidden: true
    })
  },
  onPermissionAllowed: function(){
    this.setData({
      //dialogHidden: true
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var current_user = Bmob.User.current();
    if(current_user){
      wx.redirectTo({
        url: '../order/order',
      })
    }
  },
})
