var express = require('express');
const db = require('../utils/db.js')
const multer = require('multer');
var router = express.Router();


var storage = multer.diskStorage({
  destination: function(req,file,cb){
      // cb(null,'./static/img')
      cb(null,'./public/comment_img')
  },
  filename: function(req,file,cb){
      let exts = file.originalname.split('.')
      let ext = exts[exts.length-1]
      let tmpname=(new Date()).getTime()+parseInt(Math.random()*100)
      cb(null,`${tmpname}.${ext}`);
  } 
});
var upload = multer({ 
  storage: storage
});

router.post('/updateHead',upload.single('hehe'),(req,res)=>{
  // console.log(req.body);
  
  let {size,mimetype,path}=req.file
  let types=['jpg','jpeg','png','gif']
  let tmpType = mimetype.split('/')[1]
  if(size>50000000){
      return res.send({err:-1,msg:'尺寸过大'})
  }else if(types.indexOf(tmpType)==-1){
      return res.send({err:-2,msg:'媒体类型错误'})
  }else{
      let url = `/${req.file.filename}`
      res.send({err:0,msg:'ok',img:url})
  }
  
})



router.get('/updateHead.jsp', (req, res) => {
  
  let head_img = req.query.img_src
  let id = req.query.id
  let sql= `update u_user set t_headimg = ? where id = ?;`
  console.log(head_img);
  
   db.dbconnection(sql, [head_img,id], (err, data) => {
    if (!err) {
        res.json({code:0,msg:'ok',data})
    }else{
      res.json({code:1,msg:'修改失败'})
    }
  }) 
})
router.get('/search_head.jsp', (req, res) => {
  let id = req.query.id
  let sql= `select * from u_user where id = ?;`
  
   db.dbconnection(sql, [id], (err, data) => {
    if (!err) {
        res.json({code:0,msg:'ok',data})
    }else{
      console.log(err);
      
      res.json({code:1,msg:'查询失败'})
    }
  }) 
})










//分类页面跳转
router.get(['/classification.html','/classification'], function (req, res) {
  res.render('classification', {
    title: '景点'
  })
})
//个人中心页面跳转
router.get(['/personal.html','/personal'], function (req, res) {
  res.render('personal', {
    title: '个人中心'
  })
})
//搜索分页
router.post('/classification.php', (req, res) => {
  let search = req.body.search
  let page_num = req.body.page_num
  let page_count = req.body.page_count
  let sql = 'select * from viewpoint where 1=1 '
  let sqlArr = []
  db.dbconnection(sql, sqlArr, (err, data) => {
    if (!err) {
      if (data.length >= 1) {
        if (search != '') {
          sql += ' and v_name like ? '
          sqlArr.push('%' + search + '%')
        }
        sql += `limit ${(page_num-1)*page_count},${page_count}`

        db.dbconnection(sql, sqlArr, (err_inner, data_inner) => {
          if (!err_inner) {
            if (data_inner.length > 0) {
              res.json({
                code: 0,
                msg: 'ok',
                list_count: data.length,
                data: data_inner
              })
            } else {
              res.json({
                code: 1,
                msg: '为查询到数据'
              })
            }
          } else {
            res.json({
              code: 3,
              msg: '查询出错'
            })
          }
        })
      } else {
        res.json({
          code: 4,
          msg: '未获取到数据'
        })
      }
    } else {
      res.json({
        code: 2,
        msg: '获取数据失败'
      })
    }
  })
})
//分类筛选分页后台渲染（重复很多，可以试试优化）
router.post('/filter.php', (req, res) => {
  let page_num = req.body.page_num
  let page_count = req.body.page_count
  let filter_name = req.body.filter_name
  let filter_id = req.body.filter_id
  let sql = 'select * from viewpoint where 1=1 '
  let sqlArr = []
  db.dbconnection(sql, sqlArr, (err, data) => {
    if (!err) {
      if (data.length >= 1) {
        if (filter_name == "area-id" && filter_id != "show") {
          if (filter_id == "0") {
            sql = `select * from viewpoint where 1=1`
          } else {
            sql += 'and a_typeid=? '
            sqlArr.push(filter_id)
          }
        }
        if (filter_name == "type-id") {
          if (filter_id == "0") {
            sql = `select * from viewpoint where 1=1`
          } else {
            sql += 'and k_typeid=? '
            sqlArr.push(filter_id)
          }
        }
        if (filter_name == "level-id") {
          if (filter_id == "0") {
            sql = `select * from viewpoint where 1=1`
          } else {
            sql += 'and v_level=? '
            sqlArr.push(filter_id)
          }
        }
        sql += ` limit ${(page_num-1)*page_count},${page_count}`
        db.dbconnection(sql, sqlArr, (err_inner, data_inner) => {
          if (!err_inner) {
            if (data_inner.length > 0) {
              res.json({
                code: 0,
                msg: 'ok',
                list_count: data.length,
                data: data_inner
              })
            } else {
              res.json({
                code: 1,
                msg: '为查询到数据'
              })
            }
          } else {
            res.json({
              code: 3,
              msg: '查询出错'
            })
          }
        })
      } else {
        res.json({
          code: 4,
          msg: '未获取到数据'
        })
      }
    } else {
      res.json({
        code: 2,
        msg: '获取数据失败'
      })
    }
  })
})

//个人信息
router.post('/updatePerson.php', (req, res) => {
  let username = decodeURI(req.body.username)
  let password = req.body.password
  let phone = req.body.phone
  let sex = decodeURI(req.body.sex)
  let age = req.body.age
  let id = req.body.id
  let sql= `update u_user set t_user = ?, t_pwd=?, t_phone=?, t_sex=?, t_age=? where id = ?;`
  db.dbconnection(sql, [username,password,phone,sex,age,id], (err, data) => {
    if (!err) {
        res.json({code:0,msg:'ok',data})
        
      
    }else{
      res.json({code:1,msg:'修改失败'})
    }
  })
})


router.get('/getPerson.php', (req, res) => {
  let id = req.query.id
  let sql= `select * from u_user where id=?;`
  db.dbconnection(sql, [id], (err, data) => {
    if (!err) {
        res.json({code:0,msg:'ok',data})
        
      
    }else{
      res.json({code:1,msg:'查询失败'})
    }
  })
})


module.exports = router;