// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {
    owner_openid,
    order_datas
  } = event
  let result = 0;
  let is_valid = false;
  switch (order_datas.kind) {
    case 0:
    case 1:
      is_valid = true;
      break;
  }
  if(owner_openid !=wxContext.OPENID){
    is_valid = false;
  }
  if(is_valid){

  }

  return {
    event,
    result,
  }
}