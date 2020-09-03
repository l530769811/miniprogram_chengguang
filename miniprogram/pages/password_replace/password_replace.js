// miniprogram/pages/password_replace/password_replace.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account_right : 0,
    src_pw : '',
    new_pw : '',
    verify_pw : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.account_right = app.globalData.account_right;
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

  onSourcePasswordInput :function (e) {
    this.data.src_pw =  e.detail.value;
  },
  onNewPasswordInput :function (e) {
    this.data.new_pw = e.detail.value;
  },
  onVerifyPasswordInput: function (e) {
    this.data.verify_pw = e.detail.value;
  },
  onReplacePassword:function(){
    if( this.data.account_right <=0){
      wx.showToast({
        title : '不是管理员,不能修改密码',
        icon:'none'
      })
      return;
    }

    if(!this.data.src_pw==true){
      wx.showToast({
        title : '原密码为空',
        icon:'none'
      })
      return;
    }
    if(!this.data.new_pw==true){
      wx.showToast({
        title : '新密码为空',
        icon:'none'
      })
      return;
    }
    if(!this.data.verify_pw==true){
      wx.showToast({
        title : '验证密码为空',
        icon:'none'
      })
      return;
    }
    if(this.data.verify_pw != this.data.new_pw){
      wx.showToast({
        title : '新密码与验证密码不匹配',
        icon:'none'
      })
      return;
    }

    wx.showLoading({
      title: '正在验证中',
    }) 

    app.admin_password_replace(this.data.src_pw, this.data.new_pw, {
      complete: () => {
        wx.hideLoading();
        wx.showToast({
          title: '修改密码超时',
        })
      },
       success: (res) => {
        wx.hideLoading();
         if(!res == true){            
          wx.showToast({
            title: '修改管理员失败，请检查密码是否正确',
            icon:'none'
          })           
         } else {
          wx.showToast({
            title: '修改成功',
            icon:'success'
          })
          this.setData({
            account_right: app.globalData.account_right
          })
          this.onShowInfoView();
         }
      
      },
      fail: (res) => {
        wx.hideLoading();
        wx.showToast({
          title: '修改失败，错误代码： ' + res,
        })
      }
    });
  },
  onBack:function(){
    wx.navigateBack();
  },

})