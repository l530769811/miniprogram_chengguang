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
    src_password_md5,
    default_password_md5,
    admin_right
  } = event;
  console.log('src_password_md5 = ' + src_password_md5);
  console.log('default_password_md5 = ' + default_password_md5);

  let is_valid = true;
  if (owner_openid != wxContext.OPENID) {
    is_valid = false;
  }
  let result = 0;
  let err_code = 0;
  if (is_valid) {
    try {
      const result_p = await db.collection('admin_1_4_13_9_14').where( {
        openid_15_16_5_14: owner_openid,
        admin_password: src_password_md5
      }).get()
      let get_data_count = result_p.data.length;
      if(get_data_count > 0){
        const result_promise = await db.collection('admin_1_4_13_9_14').add({
          data: [{
            openid_15_16_5_14: 'admin_openid',
            admin_password: default_password_md5,
            account_right: admin_right,
          }]
        })
        console.log(result_promise)
        result = 1;
      } else {
        err_code = 1;
      }

    } catch (err) {
      console.log('addset_default_admin_password() db.where().get()   err = ' + err)
      err_code = 2;
    }
  }
  console.log(`addset_default_admin_password() result = ${result}`);
  console.log('addset_default_admin_password() result = ' + result);

  return {
    event,
    result,
    err_code
  }
}