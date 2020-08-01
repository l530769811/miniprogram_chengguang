const app = getApp()

Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  data: {
    title_show_text: "程光科技有限公司售前售后服务",
    tool_button_info: [{
      button_text: "在线下单",
      image_url: '/images/tool_button_image_1.png',
      bind_function: "onOnline",
      width: 120,
      height: 160,
      button_width: 80
    }, {
      button_text: "售后维修",
      image_url: '/images/tool_button_image_1.png',
      bind_function: "onAfterSales",
      width: 120,
      height: 160,
      button_width: 80
    }],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    show_image_url: ['/images/home_show_1.jpg',
      '../../images/home_show_2.jpg',
      '../../images/home_show_3.jpg'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    is_login: false
  },
  methods: {
    onOnline() {
      
      if(this.isLogin()){
        wx.navigateTo({
          url: '../onlineOrder/onlineOrder?id=0',
        })
      } else {
        wx.switchTab({
          url: '../myPage/myPage',
        })
      }
     
    },
    onAfterSales() {
      if(this.isLogin()){
        wx.navigateTo({
          url: "../onlineOrder/onlineOrder?id=1",
        })
      } else {
        wx.switchTab({
          url: '../myPage/myPage',
        })
      }   
    },
    isLogin() {
      return app.globalData.is_login;
    }
  }
})