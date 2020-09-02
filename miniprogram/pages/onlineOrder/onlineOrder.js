const app = getApp()
var this_editor;
var kind = 0;
var sumbit_data = {
  address: '',
  date: '',
  time_begin: '',
  time_end: '',
  remark_text: '',
  phone_number: '',
  upload_img: [],
  kind: -1
}
Page({
  data: {
    address: '',
    address_flat: '>>',
    readOnly: false,
    placeholder: '备注：',
    date: "2020-01-01",
    time_begin: "12:00",
    time_end: "12:00",
    remark_text: '',
    upload_img_list: []
  },
  onShow: function () {
    var date = new Date(Date.now())
    let year = date.getFullYear(); // 获取完整的年份(4位,1970)
    let month = date.getMonth(); // 获取月份(0-11,0代表1月,用的时候记得加上1)
    month = month + 1
    month = (month<10) ? '0' + month : '' + month;
    let day = date.getDate(); // 获取日(1-31)
    day = (day<10) ? '0' + day : '' + day;
    
    let hour = date.getHours(); // 获取小时数(0-23)
    let hour_end = (hour + 1) >= 24 ? '00' : hour + 1;
    hour = (hour<10) ? '0'+hour : '' + hour
    hour_end = (hour_end<10) ? '0'+hour_end : '' + hour_end

    let minu = date.getMinutes(); // 获取分钟数(0-59)
    minu = (minu<10) ? '0'+ minu : '' + minu
    let sec = date.getSeconds(); // 获取秒数(0-59)
    this.setData({
      date: year + '-' + month + '-' + day,
      time_begin: hour + ':' + minu,
      time_end: hour_end + ':' + minu,
    })
  },

  onLoad: function (options) {
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
          remark_text: res.text
        })
      }
    })
  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
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
  getUploaderList: function (e) {
    console.log('onlineOder.getUploaderList()  = ' + e);
    this.setData({
      upload_img_list: e.detail.uploadList
    })
  },

  submit_to: function (e) {
    if (this.data.address == '') {
      wx.showToast({
        title: '地址空着呢！',
      })
      return
    }
    sumbit_data.kind = kind;
    sumbit_data.address = this.data.address
    let editorCtx = this.editorCtx
    let  promise = new Promise(function( resolve, reject){
      console.log('new Promise()')
      editorCtx.getContents({
        success: (res) => {
          sumbit_data.remark_text = res.text
          console.log('submit_to() remark_text = ' + sumbit_data.remark_text)
          resolve();
        }
      })
    })
  
    sumbit_data.upload_img = this.data.upload_img_list
    sumbit_data.date = this.data.date
    sumbit_data.time_begin = this.data.time_begin
    sumbit_data.time_end = this.data.time_end
    wx.showLoading({
      title: '提交中',
    }) 
    promise.then(function(){
      app.push_data_to_server(sumbit_data, {
        complete: () => {
        
        },
         success: (res) => {
          wx.hideLoading();
           if(!res.result.result==true){
            wx.showToast({
              title: '提交失败',
              icon:'none'
            })
           } else {
            wx.showToast({
              title: '提交成功',
              icon:'success'
            })
           }
 
        },
        fail: (res) => {
          wx.hideLoading();
          wx.showToast({
            title: '提交失败，错误代码： ' + res,
          })
        }
      });
    })
    //wx.navigateBack()
  },
  back_to: function (e) {
    wx.navigateBack()
  },
  onAddressSelector : function(e){
    var that = this;
    wx.navigateTo({
      url: '../region/region',
      events:{
        acceptDataFromOpenedPage : function (data) {
          that.setData({
            address : data.data
          })
        },
      }
    })
  }
})