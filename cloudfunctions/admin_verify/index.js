// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  let {
    owner_openid,
    password_md5
  } = event;

  console.log('password_md5 = ' + password_md5);
  let is_valid = true;
  if (owner_openid != wxContext.OPENID) {
    is_valid = false;
  }
  let result = {
    record_count : 0,
    record : []
  };
  if (is_valid) {
    try {
      const result_promise = await db.collection('admin_1_4_13_9_14').where({
          openid_15_16_5_14: owner_openid,
          admin_password: password_md5
        })
        .get({
          success: function (res) {
            // res.data 是包含以上定义的两条记录的数组
            console.log(res.data)
          }
        })

      result.record_count = (result_promise.data.length );
      result.record = result_promise.data;
      if (!(result.record_count) == true) {
        //can not find openid of owner_openid, then find defult openid of 
        console.log('admin_verify()  have not openid = ' + owner_openid + ' or admin_password not is ' + password_md5);
        const result_promise_other = await db.collection('admin_1_4_13_9_14').limit(1).where({
            openid_15_16_5_14: 'admin_openid',
            admin_password: password_md5
          })
          .get({
            success: function (res) {
              // res.data 是包含以上定义的两条记录的数组
              console.log(res.data)
            }
          })
        result.record_count = (result_promise_other.data.length );
        result.record = result_promise.data;
        if (!(result.record_count)  == false) {
         
          //yes! find the default admin openid, then  delete  it and add owner_openid to db  ;
          const result_remove = await db.collection('admin_1_4_13_9_14').where({
            openid_15_16_5_14: 'admin_openid'
          }).remove()
          if (result_remove.stats.removed > 0) {
            console.log('admin_verify() remove admin_openid success! ')
          } else {
            console.log('admin_verify() remove admin_openid fail! ')
          }
          let data_record = result_promise_other.data[0];
          await db.collection('admin_1_4_13_9_14').add({
            data: {
              openid_15_16_5_14: owner_openid,
              admin_password: password_md5,
              account_right: data_record.account_right,
            },
            success: function (_res) {
              console.log('login() db.add success res  = ' + _res)
            }
          })
        } else {
          console.log('admin_verify()  have not openid = ' + admin_openid + ' or admin_password not is ' + password_md5);
        }
      } else {
        console.log('admin_verify()  find openid = ' + owner_openid + ' or admin_password  is ' + password_md5);
      }

    } catch (err) {
      console.log('admin_verify() db.where().get()  fail _openid = ' + owner_openid + ' err = ' + err)
    }
  }
  console.log(`admin_verify() result = ${result.record_count}`);
  console.log('admin_verify() record = ' + result.record.toString());
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    result
  }
}