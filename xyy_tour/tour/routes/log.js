var express = require('express');
var router = express.Router();
var app = express();
var mysql = require('mysql')
var db = require('../utils/mysql')
var stringRandom = require('string-random');
var session = require('express-session')

var jwt = require('jsonwebtoken')
var fs = require('fs')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {
    title: '登陆页面',
    username: req.session.username
  });
});

// router.get('index.html', function(req, res, next) {
//   res.render('index', { username:req.session.username,userImg:req.session.userImg});
// });

router.get('/personal', function (req, res, next) {
  if (req.session.username) { //若未登陆，跳转到登陆页面
    res.render('personal', {
      title: '个人中心',
      username:req.session.username,
      userImg:req.session.userImg
    });
  } else {
    res.redirect('/')
  }
});
//注销
router.get('/destroy.do', function (req, res) {
  req.session.destroy()
  res.redirect('/')
})
//登陆
router.post('/log.php', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let sqlstr = "select * from u_user where t_user=? and t_pwd=?"
  db.connection(sqlstr, [username, password], (err, data) => {
    if (!err) {
      if (data.length >= 1) {
        req.session.username = data[0].t_user
        req.session.headImg=data[0].t_imgx
        req.session.sign=stringRandom(16, { numbers: true });
        res.json({
          code: 0,
          msg: '登陆成功',
          data
        })
      } else {
        res.json({
          code: 1,
          msg: '用户名或密码错误',
          data
        })
      }
    } else {
      res.json({
        code: 2,
        msg: '用户名或密码错误'
      })
    }

  })
})

router.post('/reg.php', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let sqlstr = "select * from u_user where t_user=?"
  let insert = "insert into u_user(t_user,t_pwd) values(?,?)"
  console.log('请求已经拦截')
  db.connection(sqlstr, [username], (err, data) => {
    console.log('已连接数据库')
    if (!err) {
      if (data.length == 0) {
        db.connection(insert, [username, password], function (err, result) {
          if (!err) {
            console.log('已连接数据库')
            req.session.username = username
            req.session.sign=stringRandom(16, { numbers: true });
            res.redirect('/');
            res.json({
              code: 0,
              msg: '注册成功',
              data
            })
            // console.log(req.session)
          } else {
            res.json({
              code: 1,
              msg: '注册失败，（数据库写入失败）',
              data
            })
          }
        })

      } else {
        res.json({
          code: 2,
          msg: '用户名已存在',
          data
        })
      }
    } else {
      res.json({
        code: 3,
        msg: '注册失败，（数据库验证失败）'
      })
    }

  })
})



module.exports = router;

