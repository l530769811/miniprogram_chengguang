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
    new_password_md5
  } = event;
  console.log('src_password_md5 = ' + src_password_md5);
  console.log('new_password_md5 = ' + new_password_md5);

  let is_valid = true;
  if (owner_openid != wxContext.OPENID) {
    is_valid = false;
  }
  let result = 0;
  if (is_valid) {
    try {
      const result_promise = await db.collection('admin_1_4_13_9_14').where({
          openid_15_16_5_14: owner_openid,
          admin_password: src_password_md5
        })
        .update({
          data: {
            admin_password: new_password_md5
          },
        })

        result = (result_promise.stats.updated);
    } catch (err) {
      console.log('admin_verify() db.where().get()   err = ' + err)
    }
  }
  console.log(`admin_verify() result = ${result}`);
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    result
  }
}