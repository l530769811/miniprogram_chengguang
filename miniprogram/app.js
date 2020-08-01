//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'chengguang-n7lhq',
        traceUser: true,
      })
    }

    this.globalData = {
      ss: false,
      is_login: false,
      avatarUrl: '',
      nickName : '',
      openid: undefined,
    }
  },
  Login: function ( callback) {

    if (this.globalData.is_login) {
      return;
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (this.globalData.is_login == false && res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.is_login = true;
              this.globalData.avatarUrl = res.userInfo.avatarUrl;
              this.globalData.nickName = res.userInfo.nickName;
              
              if(typeof callback === "function")
              {
                callback();
              }              
            },
            
          })
        } 
      }
    })

    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.globalData.openid = res.result.openid
      },
      fail: err => {
        this.globalData.openid = undefined;
        console.log('[云函数] [login] user openid: fail')
      }
    })

    console.log("app.Login() openid = " + this.globalData.openid)

  },
  getUserInfo: function (e) {
    if (this.globalData.is_login) {
      return;
    }

    if (e.detail.userInfo) {
      this.globalData.is_login = true;
      this.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
      this.globalData.nickName = e.detail.userInfo.nickName;
    }

    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.globalData.openid = res.result.openid
      },
      fail: err => {
        this.globalData.openid = undefined;
        console.log('[云函数] [login] user openid: fail')
      }
    })

    console.log("app.Login() openid = " + this.globalData.openid)
  }
})
