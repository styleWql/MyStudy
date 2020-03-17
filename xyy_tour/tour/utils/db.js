const mysql = require('mysql')

// module.exports.dbconnection=(sql,sqlarr,callback)=>{
//     // 连接池
//     let pool=mysql.createPool({
//         host:'localhost',
//         port:3306,
//         user:'root',
//         password:'root',
//         database:'qige'
//     })
//     pool.getConnection((err,connection)=>{
//         if(!err){            
//             connection.query(sql,sqlarr,callback)
//             connection.release()
//         }else{
//             return err
//         } 
//     })
// }
  



module.exports={
    dbconfig:{
        host:'localhost',
        port:3306,
        user:'root',
        password:'root',
        database:'tour'
    },
    dbconnection(sql,sqlarr,callback){
        let pool = mysql.createPool(this.dbconfig)
        pool.getConnection((err,connection)=>{
            if(!err){            
                connection.query(sql,sqlarr,callback)
                connection.release()
            }else{
                return err
            }
        })
    }
}













