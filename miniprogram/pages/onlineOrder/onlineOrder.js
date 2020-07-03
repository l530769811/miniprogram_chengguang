const app = getApp()
var this_editor;
var kind = 0;
Page({
  data: {
    address: '>>',
    readOnly: false,
    placeholder: '备注：',
    date: "2020-01-01",
    time_begin: "12:00",
    time_end: "12:00",
    ts:'bebug'
  },

  onLoad: function(options) {
    const that = this;
    switch (options.id) {
      case '0':
        kind = 0;
        wx.setNavigationBarTitle({
          title: "在线下单"
        })
        break;
      case '1':
        kind = 1;
        wx.setNavigationBarTitle({
          title: "售后维修"
        })
        break;
      default:
        wx.setNavigationBarTitle({
          title: options.id
        })
    }
  },
  onInput(e) {
    this.editorCtx.getContents({
      success: (res) => {
        this.setData({
          ts : res.text
        })       
      }
    })
  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      console.log("dddddddddddddddddddddddddddd")
    }).exec()
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeBeginChange: function (e) {
    
    this.setData({
      time_begin: e.detail.value
    })
    console.log('picker发送选择改变，携带值为', this.data.time_begin)
  },
  bindTimeEndChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time_end: e.detail.value
    })
  },
})