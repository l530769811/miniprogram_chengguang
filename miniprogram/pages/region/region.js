// miniprogram/pages/region/region.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['海南省', '全部', '全部'],
    picker_text : '',
    address_other : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      region :app.globalData.region
    })
    
    let region1 = ''
    let region2 = ''
    let region3 =  ''
    if(this.data.region[0] != '全部'){
      region1 = this.data.region[0]
    }
    if(this.data.region[1] != '全部'){
      region2 = this.data.region[1]
    }
    if(this.data.region[2] != '全部'){
      region3 = this.data.region[2]
    }
    
    this.data.picker_text = region1 + region2 + region3
    
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
  bindRegionChange: function(e){
    let region1 = ''
    let region2 = ''
    let region3 =  ''
    if(e.detail.value[0] != '全部'){
      region1 = e.detail.value[0]
    }
    if(e.detail.value[1] != '全部'){
      region2 = e.detail.value[1]
    }
    if(e.detail.value[2] != '全部'){
      region3 = e.detail.value[2]
    }
    this.setData({
      picker_text : region1 + region2 + region3,
      region : e.detail.value
    })
    app.globalData.region = e.detail.value
  },
  on_address_change : function(e){
    this.data.address_other = e.detail.value;
  }, 
  on_ok: function(e){
    let address_ = this.data.picker_text + this.data.address_other;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', { data: address_ });
    wx.navigateBack()
  },
  back_to:function(e){
    wx.navigateBack()
  }
})