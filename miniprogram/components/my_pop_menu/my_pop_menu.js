// components/pop_menu/pop_menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text : {
      type:String,
      value : ''
    },
    menu_items : {
      type: Array,
      value :[{
        icon : '',
        text : 'test1'
      },
      {
        icon : '',
        text : 'test2'
      }
     ],
    },
    menu_width: {
      type :Number,
      value : 100
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    menu_showed : false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    on_menu:function(e){

      let show_menu = this.data.menu_showed;
      show_menu = !show_menu;
      this.setData({
        menu_showed : show_menu
      })
      
      var that = this;
      let menu_index = e.currentTarget.dataset.menuid;
      that.triggerEvent('onmenuevent', {
        index :menu_index
      });
      
    },
    onpopmenu:function(e){
      let show_menu = this.data.menu_showed;
      show_menu = !show_menu;
      this.setData({
        menu_showed : show_menu
      })
    }
  }
})
