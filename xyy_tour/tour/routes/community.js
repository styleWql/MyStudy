var express = require('express');
var router = express.Router();
var comm_db = require('./../utils/db.js');

/* 社区页面渲染的路由. */
router.get('/', function (req, res, next) {
    //Promise的函数
    function read(sql) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                comm_db.dbconnection(sql, [], (err, data) => {
                    if (!err) {
                        if (data.length > 1) {
                            resolve(data);
                        }
                    }
                })
            }, 1000)
        })
    }
    // 文章表查询
    let sql1 = 'select * from article order by a_id';
    // 文章图片表查询
    let sql2 = 'select * from article_img';
    // 文章评论表查询
    let sql3 = 'select * from comment order by c_id';
    // 用户表
    let sql4 = 'select * from u_user';
    let result = Promise.all([read(sql1), read(sql2), read(sql3), read(sql4)]);
    result.then((data) => {
        res.render('community', { title: '逍遥社区', data_info: data });
    })
});

//社区详情页面的路由拦截
router.get('/comm_xq.html', function (req, res) {
    //Promise的函数
    function read(sql) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                comm_db.dbconnection(sql, [], (err, data) => {
                    if (!err) {
                        if (data.length > 1) {
                            resolve(data);
                        }
                    }
                })
            }, 1000)
        })
    }
    // 文章表查询
    let sql1 = 'SELECT * FROM article';
    // 文章图片表查询
    let sql2 = 'select * from article_img';
    // 文章评论表查询
    let sql3 = 'select * from comment';
    // 用户表
    let sql4 = 'select * from u_user';
    let result = Promise.all([read(sql1), read(sql2), read(sql3), read(sql4)]);
    let articleId = req.query.articleId;
    result.then((data) => {
        console.log(data)
        res.render('comm_xq', { title: '帖子详情', data_info: data, articleId: articleId });
    })
});

//发帖页面的路由拦截(如果没有登录直接跳转登录页面)
router.get('/myPost.html', function (req, res) {
    // console.log(req.session.username);
    if (true) {
        //Promise的函数
        function read(sql) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    comm_db.dbconnection(sql, [], (err, data) => {
                        if (!err) {
                            if (data.length > 1) {
                                resolve(data);
                            }
                        }
                    })
                }, 1000)
            })
        }
        // 文章表查询
        let sql1 = 'select * from article';
        // 文章图片表查询
        let sql2 = 'select * from article_img';
        // 文章评论表查询
        let sql3 = 'select * from comment';
        // 用户表
        let sql4 = 'select * from u_user';
        let result = Promise.all([read(sql1), read(sql2), read(sql3), read(sql4)]);
        let userid = req.query.userid;
        result.then((data) => {
            res.render('myPost', { title: '我要发帖', data_info: data,userid:userid});
        })
    } else {
        res.redirect('/community');
    }
});


// 点赞路由的拦截
router.get('/addLike.php', (req, res) => {
    let likeNum = req.query.likeNum;
    let articleId = req.query.articleId;
    let sql = 'UPDATE article SET a_like=? WHERE a_id=?';
    comm_db.dbconnection(sql, [likeNum, articleId], (err, data) => {
        if (!err) {
            if (typeof data != 'undefined') {
                res.json({
                    code: 0,
                    msg: '成功'
                })
            } else {
                res.json({
                    code: 1,
                    msg: '点赞失败'
                })
            }
        } else {
            res.json({
                code: 1,
                msg: '服务器故障'
            })
        }
    })
})

// 取消点赞的路由拦截
router.get('/redLike.php', (req, res) => {
    let likeNum = req.query.likeNum;
    let articleId = req.query.articleId;
    let sql = 'UPDATE article SET a_like=? WHERE a_id=?';
    comm_db.dbconnection(sql, [likeNum, articleId], (err, data) => {
        if (!err) {
            if (typeof data != 'undefined') {
                res.json({
                    code: 0,
                    msg: '成功'
                })
            } else {
                res.json({
                    code: 1,
                    msg: '点赞失败'
                })
            }
        } else {
            res.json({
                code: 1,
                msg: '点赞失败！服务器故障'
            })
        }
    })
})

// 评论的路由拦截
router.post('/chat.php', (req, res) => {
    let a_id = req.body.a_id;
    let user_id = req.body.user_id;
    let chat_val = req.body.chat_val;
    let chat_time = req.body.chat_time;

    // 插入评论表
    let sql = 'insert into comment values(0,?,?,?,?,1)';
    comm_db.dbconnection(sql, [Number(a_id), Number(user_id), chat_val, chat_time], (err, data) => {
        if (!err) {
            if (typeof data != 'undefined') {
                res.json({
                    code: 0,
                    msg: '成功'
                })
            } else {
                res.json({
                    code: 1,
                    msg: '评论失败'
                })
            }
        } else {
            res.json({
                code: 2,
                msg: '评论失败！服务器故障',
                err:err
            })
        }
    })
})

module.exports = router;
