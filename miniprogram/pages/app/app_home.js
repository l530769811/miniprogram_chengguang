Component({
  data: {
    homeShowImagUrl: '../index/user-unlogin.png',
    homePageButtonImageUrl: '/images/my_page.png',
    homePageButtonText: '首页',
    myPageButtonImageUrl: '/images/my_page.png',
    myPageButtonText: '我的',
    toolButtonBackgroubColor: '#ff0000',
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/homePage/homePage",
      iconPath: "/image/my_page.png",
      selectedIconPath: "/image/my_page.png",
      text: "homePageButtonText"
    }, {
      pagePath: "/pages/myPage/mypage",
      iconPath: "/image/my_page.png",
      selectedIconPath: "/image/my_page.png",
      text: "myPageButtonText"
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
      this.setData({
        selected: data.index
      })
    }
  }
})

