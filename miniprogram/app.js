//app.js
import {hex_md5} from './md5/md5'
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      /*
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'chengguang-n7lhq',
        traceUser: true,
      })
      */
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'test-lqj-env',
        traceUser: true,
      })
    }

    this.globalData = {
      ss: false,
      is_login: false,
      avatarUrl: '',
      nickName: '',
      openid: undefined,
      account_right: 0,
      region: ['海南省', '全部', '全部'],
    }
    
  },
  isFirstLogin: function () {
    let no_first = 0
    let promise = new Promise(function (resolve, reject) {
      wx.getStorage({
        key: 'is_first_login',
        success(res) {
          no_first = res.data
          console.log('App.isFirstLogin() success ')
          resolve(no_first)
        },
        fail(err) {
          console.log('App.isFirstLogin()  getStorage fail err = ' + err)
          resolve(no_first)
        }
      })
    })

    return promise.then(function (res) {
      if (res == 0) {
        wx.setStorage({
          key: 'is_first_login',
          data: 1,
        })
      }

      return res;
    })

  },
  Login: function (callback) {

    if (this.globalData.is_login) {
      return;
    }
    let globalData = this.globalData;

    let promise = new Promise(function (resolve, reject) {
      // 获取用户信息
      wx.getSetting({
        success: res => {
          console.log('App getst');
          if (globalData.is_login == false && res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                globalData.is_login = true;
                globalData.avatarUrl = res.userInfo.avatarUrl;
                globalData.nickName = res.userInfo.nickName;

                if (typeof callback === "function") {
                  callback();
                }
                console.log('App getst');
                resolve()
              }
            })
          }
        }
      })
    })
    let isFirstLoginFunc = this.isFirstLogin;
    promise.then(function () {
      isFirstLoginFunc().then((no_first) => {
        console.log('App.login() no_first = ' + no_first)
       
        // 调用云函数
        wx.cloud.callFunction({
          name: 'login',
          data: {
            not_first_login: no_first,
            nickName: globalData.nickName
          },
          success: res => {
            console.log('[云函数] [login] user openid: ', res.result.openid)
            globalData.openid = res.result.openid
          },
          fail: err => {
            globalData.openid = undefined;
            console.log('[云函数] [login] user openid: fail')
          }
        })
      });
    })
  },

  getUserInfo: function (e) {
    if (this.globalData.is_login) {
      return;
    }

    if (e.detail.userInfo) {
      this.globalData.is_login = true;
      this.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
      this.globalData.nickName = e.detail.userInfo.nickName;
      console.log('App getUserInfo() this.globalData.nickName = ' + this.globalData.nickName)
    }

    let globalData = this.globalData;
    this.isFirstLogin().then((no_first) => {
      console.log('App.getUserInfo() no_first = ' + no_first)
      
      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {
          not_first_login: no_first,
          nickName: globalData.nickName
        },
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          globalData.openid = res.result.openid
        },
        fail: err => {
          globalData.openid = undefined;
          console.log('[云函数] [login] user openid: fail')
        }
      })
    });

  },
  push_data_to_server: function (datas, funs_obj) {
    console.log('app.push_data_to_server() call')
    console.log('datas.remat_text = ' + datas.remark_text)
    if (this.globalData.is_login && !this.globalData.openid == false) {
      console.log('app.push_data_to_server() cloud.callFunction(order_to_server)')
      wx.cloud.callFunction({
        name: 'order_to_server',
        data: {
          owner_openid: this.globalData.openid,
          order_datas: datas
        },
        success: res => {
          if (typeof funs_obj.success === "function") {
            funs_obj.success(res);
          }
        },
        fail: err => {
          if (typeof funs_obj.fail === "function") {
            funs_obj.fail(err);
          }
        }
      })
    }

    if (typeof funs_obj.complete === "function") {
      funs_obj.complete();
    }
  },
  admin_verify: function (pw, funs_obj) {
    let globalData = this.globalData;
    if (this.globalData.is_login && !this.globalData.openid == false) {
      let pw_md5 = hex_md5(pw);
      console.log('app.admin_verify() pw_md5 = ' + pw_md5);
      wx.cloud.callFunction({
        name: 'admin_verify',
        data: {
          owner_openid: this.globalData.openid,
          password_md5: pw_md5
        },
        success: res => {
          if (typeof funs_obj.success === "function") {
            if(!res.result.result.record_count==false){
              this.globalData.account_right = res.result.result.record[0].account_right;
              console.log('验证成功，账号权限 = ' + this.globalData.account_right);
            }
            funs_obj.success(res.result.result.record_count);
          }
        },
        fail: err => {
          if (typeof funs_obj.fail === "function") {
            funs_obj.fail(err);
          }
        }
      })
    }

    if (typeof funs_obj.complete === "function") {
      funs_obj.complete();
    }
  },
  admin_password_replace(src_pw, new_pw, funs_obj){
    let globalData = this.globalData;
    if (this.globalData.is_login && !this.globalData.openid == false) {
      let src_pw_md5 = hex_md5(src_pw);
      let new_pw_md5 = hex_md5(new_pw);
      console.log('app.admin_password_replace() src_pw_md5 = ' + src_pw_md5);
      console.log('app.admin_password_replace() new_pw_md5 = ' + new_pw_md5);
      wx.cloud.callFunction({
        name: 'admin_password_replace',
        data: {
          owner_openid: this.globalData.openid,
          src_password_md5: src_pw_md5,
          new_password_md5: new_pw_md5
        },
        success: res => {
          if (typeof funs_obj.success === "function") {
            if(!res.result.result==false){
              console.log('修改管理员密码成功' );
            }
            funs_obj.success(res.result.result);
          }
        },
        fail: err => {
          if (typeof funs_obj.fail === "function") {
            funs_obj.fail(err);
          }
        }
      })
    }

    if (typeof funs_obj.complete === "function") {
      funs_obj.complete();
    }
  }
})