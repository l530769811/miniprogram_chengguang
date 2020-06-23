Component({
  data: {
    homeShowImagUrl: '../pages/index/user-unlogin.png',
    homePageButtonImageUrl: '../images/my_page.png',
    homePageButtonText: '首页',
    myPageButtonImageUrl: '../images/my_page.png',
    myPageButtonText: '我的',
    toolButtonBackgroubColor: '#ff0000',
    selected: 0,
    background_color_normal: "#f6f6f6",
    background_color_selected: "#fff",
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "../homePage/homePage",
      iconPath: "../images/home_tab.png",
      selectedIconPath: "/images/home_tab.png",
      text: '首页'
    }, {
      pagePath: "../myPage/myPage",
        iconPath: "../images/my_page_tab.png",
        selectedIconPath: "../images/my_page_tab.png",
        text: "我的"
      }, {
        pagePath: "../index/index_help",
        iconPath: "../images/home_tab.png",
        selectedIconPath: "/images/home_tab.png",
        text: '帮助'
      }]
  },

  onGoToMyPage: function () {
    wx.redirectTo({
      url: '../myPage/myPage',
    })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
    }
  }
})

