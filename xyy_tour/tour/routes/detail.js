var express = require('express');
var router = express.Router();
const db = require('./../utils/db.js')
/* GET home page. */

router.get(['/detail','/detail.html'], function(req, res, next) {
  // console.log(req.params);
  res.render('detail.ejs', { title: 'Express' });
});
 
//插入评论
router.get('/getdetail.jsp',(req,res)=>{
  // console.log(req.query); 
  let arr=req.query.arr 
  let time=req.query.time
  let userid=req.query.userid
  let v_id=req.query.v_id
  let head_src=req.query.t_headimg
  // console.log(time,'--+++----',v_id);
  // let sql = 'select * from u_user  '
  let sql = `INSERT INTO det_conment(v_id,t_headimg,t_user,c_content,c_time) VALUES(${v_id},'${head_src}','${userid}','${arr}','${time}')`
  db.dbconnection(sql,[],(err,data)=>{  
    if(!err){
      if(data.length!=0){
        res.json({
          code:0,
          msg:'评论成功'
          // data
        })
      }else{
        res.json({
          code:2,
          msg:"数据冲突"
        })
      }
    }else{
      res.json({
        code:1,
        msg:"评论失败"
      })
    }
  })
})

//四张图片

router.get('/four_img.jsp',(req,res)=>{
  // console.log(req.query);
  // console.log(arr,'--+++----',v_id);
  let v_id=req.query.v_id
  console.log('这是v_id',v_id);
  
  let sql = ` SELECT * FROM description WHERE	v_id = ${v_id} `
  db.dbconnection(sql,[],(err,data)=>{  
    // console.log(data);
    if(!err){
      if(data.length!=0){
        res.json({
          code:0,
          msg:'success',
          data
        })
      }else{
        res.json({
          code:2,
          msg:"no msg"
        })
      }
    }else{
      res.json({
        code:1,
        msg:"err"
      })
    }
  })
})

//四张图片

/* 详情推荐拦截机渲染 */

router.get('/rend_images.jsp',(req,res)=>{
  // let v_id=req.query.v_id
  // console.log('这是v_id',v_id);
  // let sql = ` SELECT * FROM viewpoint WHERE	v_id = ${v_id} `
  let sql = ` SELECT * FROM viewpoint `
  db.dbconnection(sql,[],(err,data)=>{  
    // console.log(data);
    if(!err){
      if(data.length!=0){
        res.json({
          code:0,
          msg:'success',
          data
        })
      }else{
        res.json({
          code:2,
          msg:"no msg"
        })
      }
    }else{
      res.json({
        code:1,
        msg:"err"
      })
    }
  })
})

/* 详情推荐拦截机渲染完 */




//分页渲染拦截
router.get('/getRender.jsp',(req,res)=>{
  // console.log(req.query);
  let arr=req.query.arr
  let time=req.query.time
  let page_num=req.query.page_num
  let page_count=req.query.page_count
  let v_id = req.query.v_id
  console.log(time,arr,9999);
  let sql = `select * from det_conment where v_id = ${v_id}  `
  // let sql = `INSERT INTO det_conment VALUES(5,4,4,'${arr}','${time}',1 )`
  db.dbconnection(sql,[],(err,data)=>{  
    if(!err){
      if(data.length!=0){
        // res.json({
        //   code:0,
        //   msg:'success',
        //   data
        // })
/* 里面的 */
sql+=`limit ${(page_num-1)*page_count},${page_count}`
console.log(sql);

db.dbconnection(sql,[],(err_inner,data_inner)=>{  
  if(!err_inner){
    if(data.length!=0){
      res.json({
        code:0,
        msg:'success',
        // data
        list_count:data.length,data:data_inner
      })
    }
  }
})
/* 里面的 */
      }else{
        res.json({
          code:2,
          msg:"Undefined"
        })
      }
    }else{
      res.json({
        code:1,
        msg:"Error"
      })
    }
  })
})




/* 渲染详情图片 */
router.get('/rend_img.jsp',(req,res)=>{
  // console.log(req.query);
  let arr=req.query.arr
  let num=req.query.num
  let v_id=req.query.v_id
  console.log(arr,'--+++----',v_id);
  let sql = `SELECT * FROM description WHERE	v_id = ${v_id}  `
  db.dbconnection(sql,[],(err,data)=>{  
    if(!err){
      if(data.length!=0){
        res.json({
          code:0,
          msg:'success',
          data
        })
      }else{
        res.json({
          code:2,
          msg:"no msg"
        })
      }
    }else{
      res.json({
        code:1,
        msg:"err"
      })
    }
  })
})
/* 渲染详情图片 */



//点赞拦截
router.get('/getlikes.jsp',(req,res)=>{
  // console.log(req.query);
  let num=req.query.num
  let sstr=req.query.sstr
  let userid=req.query.userid
  // console.log(num,userid,9999);
       var sql = `SELECT * FROM people WHERE userid = ${userid} AND c_content = '${sstr}'`

  db.dbconnection(sql,[],(err,data)=>{  
    if(!err){
      console.log(data,12121212112);
      
      if(data.length<1){ 
       /* 里面的第一层 */
      //  sql = `SELECT * FROM u_user`
       sql = `INSERT INTO people(c_content,userid) VALUES('${sstr}',${userid})     `
       db.dbconnection(sql,[],(err_inner,data_inner)=>{  
        if(!err_inner){
          if(data_inner.length!=0){ 
        /* 里面的第二层 */
        // sql = `SELECT * FROM people WHERE userid = ${userid}`
     sql = `UPDATE det_conment SET c_likes=${num} WHERE c_content='${sstr}'`

        db.dbconnection(sql,[],(err_inner_two,data_inner_two)=>{  
          if(!err_inner_two){
            if(data.length!=0){
              res.json({
                code:0,
                msg:'ok吗？',
                data,
                data_inner,
                data_inner_two
              })
            }else{
              res.json({
                code:2,
                msg:"Undefined"
              })
            }
          }else{
            res.json({
              code:1,
              msg:"Error"
            })
          }
        })
        /* 里面的第二层 */
          }
        }
      })
       /* 里面的第一层 */

      }
    }
  })
})

 

router.get('/user/:userId', function(req, res, next) {
  // console.log(req.params);
  console.log(req);
  
});
module.exports = router;
 


