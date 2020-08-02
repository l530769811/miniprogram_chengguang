// components/upload_img.js

var ImgInfo = {
  cloudImgFile: 'img',
  localImgFile: ''
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maxImgCount: {
      type: Number,
      value: 6
    },
    title: {
      type: String,
      value: 'upload image'
    }
  },
  

  /**
   * 组件的初始数据
   */
  data: {
    title: 'yuyuyuyu',
    UploadImgInfo: [],
    showImgList: [],
    maxImgCount: 0,
    curImgCount: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clearImg: function (e) {
      var that = this;
      let cur_index = e.currentTarget.dataset.index;
      that.data.curImgCount--;
      that.data.showImgList.splice(cur_index, 1);
      that.data.UploadImgInfo.splice(cur_index, 1);
      let tmpUploadImgInfo = [];
      tmpUploadImgInfo = tmpUploadImgInfo.concat(that.data.UploadImgInfo);
      let tmpShowImgList = [];
      tmpShowImgList = tmpShowImgList.concat(that.data.showImgList);
      that.setData({
        UploadImgInfo : tmpUploadImgInfo,
        showImgList :  tmpShowImgList,
        curImgCount: that.data.curImgCount
      })
      that.triggerEvent('getuploaderlist', {
        uploadList :tmpUploadImgInfo
      });
    },
    addImg: function () {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          const filePath = res.tempFilePaths[0]
          var timestamp = Date.now();   
          const cloudPath = '' + timestamp + filePath.match(/\.[^.]+?$/)[0]
          console.log("cloudPath : " + cloudPath);
          let tmpUploadImgInfo = []
          tmpUploadImgInfo = tmpUploadImgInfo.concat(that.data.UploadImgInfo);
          tmpUploadImgInfo.push(
            {
            cloudImgFile : cloudPath,
            localImgFile : filePath
          })
          let tmpShowImgList = [];
          tmpShowImgList = tmpShowImgList.concat(that.data.showImgList);
          tmpShowImgList.push(filePath)
          let tmpCurImgCount = that.data.curImgCount;
          tmpCurImgCount++;
          that.data.curImgCount++;
          that.setData({
            UploadImgInfo : tmpUploadImgInfo,
            showImgList : tmpShowImgList,
            curImgCount: that.data.curImgCount
          })
          that.triggerEvent('getuploaderlist', {
            uploadList :tmpUploadImgInfo
          });
        },
      })
    },
    showImg: function (e) {
      var that = this;
      wx.previewImage({
        urls: that.data.showImgList,
        current: that.data.showImgList[e.currentTarget.dataset.index]
      })
    },
  }
})
