let API_HOST = "http://xxx.com/xxx";
let DEBUG = true; //切换数据入口
var Mock = require('mock.js')
let Mockdata = Mock.mock({
  'error_code': '',
  'error_msg': '',
  'address|10': [{
    'id|+1': 1,
    'img': "@image('200x100', '#4A7BF7','#fff','pic')",
    'title': '@ctitle(3,8)',
    'city': "@county(true)",
    'stock_num': '@integer(0,100)', //库存数量  
    'marketing_start': '@datetime()',
    'marketing_stop': '@now()',
    'price': '@integer(100,2000)', //现价，单位：分  
    'original_price': '@integer(100,3000)'
  }],
  "goods|10": {
    "result|10": [{
      "content": "@ctitle(10,18)",
      "fav_nums|0-3": 0,
      "id": "@integer(1,10)",
      "image": "http://192.168.11.1:8000/images/my/item-@integer(1,4).png",
      "index": "@integer(1,10)",
      "like_status": "@integer(0,1)",
      "pubdate": "@datetime('yyyy-MM-dd')",
      "title": "@ctitle(3,6)",
      "type|1": [100,200,300]
    }]
  }
})
function ajax(data = '',fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: config.API_HOST + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : {
        "Content-Type": "application/json"
      },
      success: function(res) {
        fn(res);
      }
    });
  } else {
    let res;
    switch (data){
      case "address":
        res = Mockdata.address;
        break;
      case "goods":
        res = Mockdata.goods;
        break;
    }
    
    // 输出结果
    // console.log(JSON.stringify(res, null, 2))
    fn(res);
  }
}
module.exports = {
  ajax: ajax
}