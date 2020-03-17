// var mysql = require("mysql");
// module.exports.sqlConnect = function (sql, sqlArr, callBack) {
//   const connection=mysql.createConnection({
//     host: "172.16.13.11",
//     port: "3306",
//     user: "root",
//     password: "root",
//     database: "tour"
//   })
//   dbConnection.connect()
//   dbConnection.query(sql, sqlArr, callBack)
//   dbconnection.end()
// }



const mysql = require('mysql');
module.exports = {
   config:{
    host:'localhost',
    port:3306,
    user:'root',
    password:'root',
    database:'tour'
   },
   connection(sql,arr,callback){
       const pool  = mysql.createPool(this.config);
       pool.getConnection((err,connection)=>{
           if(!err){
               connection.query(sql,arr,callback);
               connection.release();
           }else{
               return err;
           }
       })
   }
}
