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
    show_admin_view:false,
    homeShowImagUrl: '../index/user-unlogin.png',
    homePageButtonImageUrl: '/images/my_page.png',
    homePageButtonText: '首页',
    myPageButtonImageUrl: '/images/my_page.png',
    myPageButtonText: '我的',
    toolButtonBackgroubColor: '#ff0000',
    title_show_text: "我的空间",
    avatarUrl: '../../images/user-unlogin.png',
    nickName: '',
    nickName_show:'点击头像登录',
  },
  methods: {
     login_callback : function(){
      this.setData({
        avatarUrl: app.globalData.avatarUrl,
        nickName: app.globalData.nickName
      })
      if(! this.data.nickName==false){
        this.setData({
          avatarUrl: app.globalData.avatarUrl,
          nickName_show : '欢迎您 ： ' + this.data.nickName
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
      this.data.nickName =  app.globalData.nickName;
      if(! this.data.nickName==false){
        this.setData({
          avatarUrl: app.globalData.avatarUrl,
          nickName_show : '欢迎您 ： ' + this.data.nickName
        })
      }
    },
    onShowAdminVerifyView: function () {
     
      this.setData({
        show_admin_view:true,
      })
    },
    onShowInfoView:function(){
      this.setData({
        show_admin_view:false,
      })
    },
    onGoToHome: function () {
      wx.redirectTo({
        url: '../app/app_home',
      })
    },
    password_input:function(e){
      
    }
  },  
})