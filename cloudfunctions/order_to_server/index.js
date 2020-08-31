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
    order_datas
  } = event
  
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
  let result = 0;
  if(is_valid){   
    const order_id_head = 21;
    let _order_begin_time =  order_datas.date + ' ' + order_datas.time_begin;
    let _order_end_time = order_datas.date + ' ' + order_datas.time_end;
    let _order_kind = order_datas.kind;
    let _order_time_ut = (Date.now());
    

    let _date = new Date(_order_time_ut);
    let year = _date.getFullYear(); // 获取完整的年份(4位,1970)
    let month = _date.getMonth(); // 获取月份(0-11,0代表1月,用的时候记得加上1)
    month = month + 1
    month = (month<10) ? '0' + month : '' + month;
    let day = _date.getDate(); // 获取日(1-31)
    day = (day<10) ? '0' + day : '' + day;
    
    let hour = _date.getHours(); // 获取小时数(0-23)
    hour = (hour<10) ? '0'+hour : '' + hour
   

    let minu = _date.getMinutes(); // 获取分钟数(0-59)
    minu = (minu<10) ? '0'+ minu : '' + minu
    let sec = _date.getSeconds(); // 获取秒数(0-59)
    sec = (sec<10) ? '0'+sec : '' + sec;

    let bit1 = Math.floor(Math.random()*9);
    let bit2 = Math.floor(Math.random()*9);
    let bit3 = Math.floor(Math.random()*9);
    let bit4 = Math.floor(Math.random()*9);
    let bit5 = Math.floor(Math.random()*9);
    let bit6 = Math.floor(Math.random()*9);
    let _order_id_tail = '' + bit1 +bit2 + bit3 + bit4 + bit5 + bit6;
    let _order_id = '' + order_id_head + year + month + day + hour + minu + sec +  _order_id_tail;
    
    try{
      const result_promise = await db.collection('order_15_18_4_5_18').add({
        data: {
          _openid : wxContext.OPENID,
          openid_15_16_5_14 : wxContext.OPENID,
          order_time : new Date(_order_time_ut),
          ordor_id : _order_id, 
          order_begin_time : _order_begin_time,
          order_end_time : _order_end_time,
          order_kind :  _order_kind,
        }
      })    
      
      result = result_promise._id;
      
    } catch (err){
      console.log('order_to_server() db.add fail _order_id = ' + _order_id + ' err = ' + err)
    }  
  }
  console.log('order_to_server() result = ' + result);
  return {
    event,
    result,
  }
}