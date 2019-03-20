// pages/detail/detail.js
var Bmob = require('../../utils/bmob.js')
var that;
var Order = Bmob.Object.extend("Order")
var query = new Bmob.Query(Order)
var id;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    console.log('获取的订单列表的id为：',options.orderId)
    id = options.orderId
    
  },

  /**
   * 点击事件
   */
  onEditClick: function () {
    console.log('点击了编辑', id)
    wx.navigateTo({
      url: '/pages/edit/edit?orderId=' + id,
    })
  },

  onDeleteClick: function () {
    
    wx.showModal({

      title: '温馨提示',

      content: '是否确认删除当前账单？',

      confirmText: "删除",

      cancelText: "取消",

      success: function (res) {

        console.log(res);

        if (res.confirm) {
          query.get(id, {
            success: function (result) {
              result.destroy({
                success: function (myObject) {
                  console.log("删除成功...")
                  //删除成功
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 1500,
                    success: function(){
                      //保存成功返回首页刷新数据
                      var pageStack = getCurrentPages()
                      var orderListPage = pageStack[pageStack.length - 2]
                      orderListPage.changeData("refresh")
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  })
                },
                error: function (myObject, error) {
                  //删除失败
                  console.log('删除失败：',error)
                }
              })
            },
            error: function (object, error) {
              //查询失败
              console.log('查询日志详情失败：' + error.code + " " + error.message)
            }
          })

        } else {

          console.log('用户点击取消')

        }

      }

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //this.dialog = this.selectComponent('#dialog')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('--------------onshow-------------')
    query.get(id, {
      success: function (result) {
        //查询成功
        console.log('查询日志详情成功：', result)
        that.setData({
          //order: orderInfo,
          customer: result.get("customer"),
          nickname: result.get("nickname"),
          goodName: result.get("goodName"),
          address:result.get("address"),
          goodPrice: result.get("goodPrice"),
          phone: result.get("phone"),
          proxyName: result.get("proxyName"),
          orderNumber: result.get("orderNumber"),
          orderTime: result.get("orderTime"),
          orderStatus: result.get("orderStatus"),
          goodType: result.get("goodType"),
          hidden: true
        })
      },
      error: function (object, error) {
        //查询失败
        console.log('查询日志详情失败：' + error.code + " " + error.message)
      }
    })
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