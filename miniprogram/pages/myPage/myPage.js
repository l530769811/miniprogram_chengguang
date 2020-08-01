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
    homeShowImagUrl: '../index/user-unlogin.png',
    homePageButtonImageUrl: '/images/my_page.png',
    homePageButtonText: '首页',
    myPageButtonImageUrl: '/images/my_page.png',
    myPageButtonText: '我的',
    toolButtonBackgroubColor: '#ff0000',
    title_show_text: "我的空间",
    avatarUrl: '../../images/user-unlogin.png',
    nickName: ''
  },
  methods: {
     login_callback : function(){
      this.setData({
        avatarUrl: app.globalData.avatarUrl,
        nickName: app.globalData.nickName
      })
    },
    onLoad: function () {
      // 获取用户信息
      let func = this.login_callback.bind(this);
      app.Login(func);     
    },
    onGetUserInfo: function (e) {
      app.getUserInfo(e);
      this.setData({
        avatarUrl: app.globalData.avatarUrl,
        nickName: app.globalData.nickName
      })
    }
  },

  onGoToHome: function () {
    wx.redirectTo({
      url: '../app/app_home',
    })
  },

})