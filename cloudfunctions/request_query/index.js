// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const case_list = [{
    // 
    collection_name: 'admin_1_4_13_9_14',
    field: [{
        openid_15_16_5_14: null
      },
      {
        admin_password: null
      },
      {
        account_right: null
      },
      {
        nick_name: null
      }
    ]
  },
  {
    collection_name: 'user_21_19_5_18',
    field: [{
        openid_15_16_5_14: null
      },
      {
        pay_password: null
      },
      {
        last_login_due: null
      },
      {
        nick_name: null
      },
      {
        encrypt_kind: null
      }
    ]
  },
  {
    collection_name: 'order_15_18_4_5_18',
    field: [{
        openid_15_16_5_14: null
      },
      {
        order_bengin_time: null
      },
      {
        order_end_time: null
      },
      {
        order_time: null
      },
      {
        order_kind: null
      },
      {
        order_id: null
      }
    ]
  },
]

function margeWhereData(srcCriteria, criteria) {
  return {
    ...srcCriteria,
    ...criteria,
  }
}


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  let {
    owner_openid,
    query_case
  } = event;

  let is_valid = true;
  if (owner_openid != wxContext.OPENID) {
    is_valid = false;
  }
  let result = {
    record_count: 0,
    record: []
  };
  if (is_valid) {
    try {
      let collection_name = case_list[query_case.type].collection_name;
      let field_name = case_list[query_case.type].field[query_case.case[0].item_id];
      let field_vuale = case_list[query_case.type].field[query_case.case[0].item_value[0].value];
      let _db_cmd = db.command;
      let where_data_case = {};
      for (var index_field_name in query_case.case) {
        for (var index_field_vuale in query_case.case[index_field_name].item_value) {
          let field_name_obj = case_list[query_case.type].field[query_case.case[index_field_name].item_id];
          let field_vuale = query_case.case[index_field_name].item_value[index_field_vuale].value;
          let than_kind = query_case.case[index_field_name].item_value[index_field_vuale].than_kind;
          let logic = query_case.case[index_field_name].item_value[index_field_vuale].logic;

          let than_obj = undefined;

          switch (than_kind) {
            case 0: //eq
            than_obj = _db_cmd.eq(field_vuale)
              break;
            case 1: //neq
            than_obj = _db_cmd.neq(field_vuale)
              break;
            case 2: //lt
            than_obj = _db_cmd.lt(field_vuale)
              break;
            case 3://lte
            than_obj = _db_cmd.lte(field_vuale)
              break;
            case 4: //gt
            than_obj = _db_cmd.gt(field_vuale)
              break;
            case 5: //gte
            than_obj = _db_cmd.gte(field_vuale)
              break;
            default:
              than_obj = _db_cmd.eq(field_vuale)
              break;
          }
          for(x in field_name_obj){
            field_name_obj[x] = than_obj
          }
         


          switch (logic) {
            case 0:
              break;
            case 1:
              break;
            case 2:
              break;
            default:
              break;
          }
          where_data_case = margeWhereData(where_data_case, field_name_obj);
        }
      }
      console.log('where_data_case = down');
      console.log(where_data_case);
      const result_promise = await db.collection('admin_1_4_13_9_14').where(where_data_case)
        .get({
          success: function (res) {
            // res.data 是包含以上定义的两条记录的数组
            console.log(res.data)
          }
        })

      result.record_count = (result_promise.data.length);
      result.record = result_promise.data;
    } catch (err) {
      console.log('admin_verify() db.where().get()  fail _openid = ' + owner_openid + ' err = ' + err)
    }
  }

  return {
    event,
    result
  }
}