const app = getApp()
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  },

  data: {
    is_logined: false,
    account_right: 0,
    show_admin_view: false,
    homeShowImagUrl: '../index/user-unlogin.png',
    homePageButtonImageUrl: '/images/my_page.png',
    homePageButtonText: '首页',
    myPageButtonImageUrl: '/images/my_page.png',
    myPageButtonText: '我的',
    toolButtonBackgroubColor: '#ff0000',
    title_show_text: "我的空间",
    avatarUrl: '../../images/user-unlogin.png',
    nickName: '',
    nickName_show: '点击头像登录',
    verfity_password: '',
    menu_items: [{
        icon: '../../images/replay_password_icon.png',
        text: '修改密码'
      },
      {
        icon: '../../images/default_password_icon.png',
        text: '默认密码'
      },
      {
        icon: '../../images/manager_account_icon.png',
        text: '管理帐号'
      }
    ]

  },
  methods: {
    login_callback: function () {
      this.data.nickName = app.globalData.nickName;
      if (!this.data.nickName == false) {
        this.setData({
          avatarUrl: app.globalData.avatarUrl,
          nickName_show: '欢迎您 ： ' + this.data.nickName,
          is_logined: app.globalData.is_login,
          account_right: app.globalData.account_right
        })
      }
    },
    onLoad: function () {
      // 获取用户信息
      let func = this.login_callback.bind(this);
      app.Login(func);
    },
    onGetUserInfo: function (e) {
      app.getUserInfo(e);
      this.data.nickName = app.globalData.nickName;
      if (!this.data.nickName == false) {
        this.setData({
          avatarUrl: app.globalData.avatarUrl,
          nickName_show: '欢迎您 ： ' + this.data.nickName,
          is_logined: app.globalData.is_login,
          account_right: app.globalData.account_right
        })
      }
    },
    onShowAdminVerifyView: function () {

      this.setData({
        show_admin_view: true,
      })
    },
    onVerify: function () {
      if (!this.data.verfity_password == true) {
        wx.showToast({
          title: '密码为空',
          icon: 'none'
        })
        return;
      }
      wx.showLoading({
        title: '正在验证中',
      })
      app.admin_verify(this.data.verfity_password, {
        complete: () => {
          wx.hideLoading();
          wx.showToast({
            title: '验证超时',
          })
          console.log('app.admin_verify() complete')
        },
        success: (res) => {
          wx.hideLoading();
          if (!res == true) {
            wx.showToast({
              title: '验证失败，请确认是否是管理员或检查密码是否正确',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: '验证成功',
              icon: 'success'
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
            title: '验证失败，错误代码： ' + res,
          })
        }
      });
    },
    onShowInfoView: function () {
      this.setData({
        show_admin_view: false,
      })
    },
    onGoToHome: function () {
      wx.redirectTo({
        url: '../app/app_home',
      })
    },
    password_input: function (e) {
      this.data.verfity_password = e.detail.value;
    },
    onAdminPage: function () {
      wx.navigateTo({
        url: '../password_replace/password_replace',
      });
    },
    on_menu: function (e) {
      console.log('点中菜单项id = ' + e.detail.index);
      let index_id = e.detail.index;
      switch(index_id){
        case 0:
          this.onAdminPage();
          break;
      }
    },
  },

})