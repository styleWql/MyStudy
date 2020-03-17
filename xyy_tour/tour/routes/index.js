var express = require('express');
var router = express.Router();
var app = express();
var mysql = require('mysql')
var db = require('../utils/db.js')
var stringRandom = require('string-random');
var session = require('express-session')

var jwt = require('jsonwebtoken')
var fs = require('fs')
/* GET home page. */
router.get(['/','/index.html'], function(req, res, next) {
  // console.log(req.params);
  res.render('index', { title: '首页'});
});
router.get('/out', function (req, res) {
  // req.session.username = null;
  // req.session.userImg=null;
  res.redirect('/')
})
module.exports = app;

router.get('/classification.html', function(req, res, next) {
  // console.log(req.params);
  res.render('classification', { title: '景点分类' });
});

router.get('/aboutus.html', function(req, res, next) {
  // console.log(req.params);
  res.render('aboutus', { title: '关于我们' });
});

router.get('/login.html', function(req, res, next) {
  // console.log(req.params);
  res.render('login', { title: '登录' });
});
//登陆
router.post('/log.php', (req, res) => {
  console.log(111);
  
  let username = req.body.username;
  let password = req.body.password;
  let sqlstr = "select * from u_user where t_user=? and t_pwd=?"
  console.log(222);
  db.dbconnection(sqlstr, [username, password], (err, data) => {
    if (!err) {
      if (data.length >= 1) {
        console.log(44);
        req.session.username = data[0].t_user
        req.session.headImg=data[0].t_img
        // console.log(req.session);
        // req.session.
        // console.log(data[0].t_user)
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

  // res.send(123)
})

router.get('/index.php', (req, res) => {
  // let sql = 'select * from viewpoint where 1=1'
  let sql = 'select * from viewpoint limit 0,15;'
  let sqlArr = []
  db.dbconnection(sql, [], (err, data) => {
    if (!err) {
      if (data.length >= 1) {
        res.json({
          code: 0,
          msg: 'ok',
          data: data
        })
        console.log('ssssss')
      } else {
        res.json({
          code: 1,
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

module.exports = router;

