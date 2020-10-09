// miniprogram/pages/password_addset/password_addset.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    right_array: ['普通权限', '超级权限'],
    account_right: 0,
    src_pw: '',
    addset_pw: '',
    verify_addset_pw: '',
    admin_right: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.account_right = app.globalData.account_right;
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onSourcePasswordInput: function (e) {
    this.data.src_pw = e.detail.value;
  },
  onAddsetPasswordInput: function (e) {
    this.data.addset_pw = e.detail.value;
  },
  onVerifyAddsetPasswordInput: function (e) {
    this.data.verify_addset_pw = e.detail.value;
  },
  onAddset: function () {
    if (this.data.account_right <= 1) {
      wx.showToast({
        title: '不是超级管理员,不能修改密码',
        icon: 'none'
      })
      return;
    }

    if (!this.data.src_pw == true) {
      wx.showToast({
        title: '原密码为空',
        icon: 'none'
      })
      return;
    }
    if (!this.data.addset_pw == true) {
      wx.showToast({
        title: '增设密码为空',
        icon: 'none'
      })
      return;
    }
    if (!this.data.verify_addset_pw == true) {
      wx.showToast({
        title: '验证增设密码为空',
        icon: 'none'
      })
      return;
    }
    if (this.data.verify_addset_pw != this.data.addset_pw) {
      wx.showToast({
        title: '新密码与验证密码不匹配',
        icon: 'none'
      })
      return;
    }

    wx.showLoading({
      title: '正在验证中',
    })
    let _right = this.data.admin_right;
    app.addset_default_admin_password(this.data.src_pw, this.data.addset_pw,  _right,{
      complete: () => {
        wx.hideLoading();
        wx.showToast({
          title: '增设密码超时',
        })
      },
      success: (res) => {
        wx.hideLoading();
        if (!res == true) {
          wx.showToast({
            title: '增设密码失败，请检查密码是否正确',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '增设密码成功',
            icon: 'success'
          })
          
        }

      },
      fail: (res) => {
        wx.hideLoading();
        wx.showToast({
          title: '增设密码失败，错误代码： ' + res,
        })
      }
    });
  },
  onBack: function () {
    wx.navigateBack();
  },
  onRightChange: function (e) {
    let index = parseInt(e.detail.value, 10);
   
    this.setData({
      admin_right : index +1
    })
    console.log('password_addset.onRightChange() admin_right = ' + this.data.admin_right);
  }
})