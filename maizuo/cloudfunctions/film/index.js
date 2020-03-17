// 云函数入口文件
const cloud = require('wx-server-sdk') //这里提供查询数据库相关的方法

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => { //event:前端调用云函数传递的参数  context：执行上下文对象
  const wxContext = cloud.getWXContext()

  //写的业务逻辑
  //去数据库获取电影的列表

  let db = cloud.database(); //获取数据库操作对象
  if (event.action === "get") {//查询
    return db.collection("films").get() //调用了云函数之后返回去的值
  } 

}