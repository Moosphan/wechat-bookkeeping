// pages/edit/edit.js
var Bmob = require('../../utils/bmob.js')
var Order = Bmob.Object.extend("Order")
var query = new Bmob.Query(Order)
var that;
var objectId;
// 是否来修改信息的
var isToUpdate = false;
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
    //委托给that
    that = this
    console.log('编辑页面获取的订单列表的id为：', options.orderId)
    objectId = options.orderId
    if (objectId){
      isToUpdate = true
    }
    if(isToUpdate){
      query.get(objectId, {
        success: function (result) {
          //查询成功
          console.log('查询日志详情成功：', result)
          var payState = result.get("orderStatus")==="已支付" ? 1 : 0
          var type = result.get("goodType")==="鲜货" ? 0 : 1
          that.setData({
            //order: orderInfo,
            customer: result.get("customer"),
            nickname: result.get("nickname"),
            goodName: result.get("goodName"),
            address: result.get("address"),
            goodPrice: result.get("goodPrice"),
            phone: result.get("phone"),
            proxyName: result.get("proxyName"),
            orderNumber: result.get("orderNumber"),
            orderTime: result.get("orderTime"),
            orderStatus: payState,
            goodType: type,
            hidden: true
          })
        },
        error: function (object, error) {
          //查询失败
          console.log('查询日志详情失败：' + error.code + " " + error.message)
        }
      })
    }
    
  },

  /**
   * 表单提交
   */
  formSubmit: function (e) {
    console.log('表单提交了，携带数据为：',e.detail.value)
    var customer = e.detail.value.input_customer   //顾客姓名
    var nickname = e.detail.value.input_nickname   //顾客昵称
    var goodName = e.detail.value.input_good       //商品名称
    var address  = e.detail.value.input_address    //顾客地址
    var money = e.detail.value.input_money         //订单金额
    var phone = e.detail.value.input_phone         //联系方式
    var proxy = e.detail.value.input_proxy         //代理人
    var orderNo = e.detail.value.input_order_no    //物流单号
    var orderTime = e.detail.value.input_time      //下单时间
    var payState = e.detail.value.pay_state        //支付状态
    var goodType = e.detail.value.good_type        //商品类型

    if (customer.length == 0 || nickname.length == 0 || goodName.length == 0 
        || address.length == 0 || money.length == 0 || phone.length == 0 || proxy.length == 0
        || orderNo.length == 0 || orderTime.length == 0 || payState.length == 0 || goodType.length == 0){
          wx.showToast({
            title: '每项信息不能为空！',
            icon: 'loading',
            duration: 1000
          })

    }

    //保存数据到bmob
    var Order = Bmob.Object.extend("Order")    
    var order = new Order()
    order.set("customer", customer)
    order.set("nickname", nickname)
    order.set("goodName", goodName)
    order.set("address", address)
    order.set("goodPrice", money)
    order.set("phone", phone)
    order.set("proxyName", proxy)
    order.set("orderNumber", orderNo)
    order.set("orderTime", orderTime)
    order.set("orderStatus", payState)
    order.set("goodType", goodType)
    if(isToUpdate){
      query.get(objectId,{
        success: function (result) {
          //修改数据并保存
          result.set("customer", customer)
          result.set("nickname", nickname)
          result.set("goodName", goodName)
          result.set("address", address)
          result.set("goodPrice", money)
          result.set("phone", phone)
          result.set("proxyName", proxy)
          result.set("orderNumber", orderNo)
          result.set("orderTime", orderTime)
          result.set("orderStatus", payState)
          result.set("goodType", goodType)
          result.save()
          console.log("数据修改成功...")
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1500
          })
          var pageStack = getCurrentPages()
          var orderListPage = pageStack[pageStack.length - 3]
          orderListPage.changeData("refresh")
          wx.navigateBack({
            delta: 1
          })

        },
        error: function (object, error) {

        }
      })
    }else {
      order.save(null, {
        success: function (result) {
          console.log("数据新增成功...")
          wx.showToast({
            title: '新增成功',
            icon: 'success',
            duration: 1500
          })
          //保存成功返回首页刷新数据
          var pageStack = getCurrentPages()
          var orderListPage = pageStack[pageStack.length - 2]
          orderListPage.changeData("refresh")
          wx.navigateBack({
            delta: 1
          })

        },
        error: function (result, error) {
          console.log("日记保存失败：", error)
        }
      })
    }
    
  },

  formReset: function (e) {
    console.log('表单被重置了～')
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
  
  }
})