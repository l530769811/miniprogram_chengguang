// miniprogram/pages/manager_account/manager_account.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    right_array: ['全部','普通权限', '超级权限'],
    account_right: 0,
    src_pw: '',
    admin_right: 0,
    searched_nick_name : '',
    account_record: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.account_right = app.globalData.account_right;
  },
  onNicknameInput: function (e) {
    this.data.searched_nick_name = e.detail.value;
  },
  onRightChange: function (e) {
    let index = parseInt(e.detail.value, 10);
   
    this.setData({
      admin_right : index
    })
    console.log('manager_account.onRightChange() admin_right = ' + this.data.admin_right);
  },
  onSearchAccount: function (e) {
    let that = this;
    if (this.data.account_right <= 1) {
      wx.showToast({
        title: '不是超级管理员,不能使用搜索功能',
        icon: 'none'
      })
      return;
    }

    // if (!this.data.src_pw == true) {
    //   wx.showToast({
    //     title: '密码为空',
    //     icon: 'none'
    //   })
    //   return;
    // }

    wx.showLoading({
      title: '正在搜索中',
    })
    let _right = this.data.admin_right;
    app.request_query({
      type: 0,
      case: [{
        item_id: 2,
        item_value: [{
          value: 2,
          than_kind: 0,
          logic: 0
        }]
      }],
    }, {
      complete: () => {
        wx.hideLoading();
        wx.showToast({
          title: '搜索超时',
        })
      },
      success: (res) => {
        wx.hideLoading();
        if (!res.record_count == true) {
          wx.showToast({
            title: '搜索失败，请检查密码是否正确',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '搜索成功',
            icon: 'success'
          })
          that.setData({
            account_record : res.record
          })

        }

      },
      fail: (res) => {
        wx.hideLoading();
        wx.showToast({
          title: '搜索失败，错误代码： ' + res,
        })
      }
    });
  },
  onBack : function(){
    wx.navigateBack()
  }

})