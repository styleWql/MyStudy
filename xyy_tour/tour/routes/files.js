var express = require('express');
var multer = require('multer');
var fs = require('fs');
var router = express.Router();
var comm_db = require('../utils/db.js');

// var storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,'./public/com_img')
//     },
//     filename: function(req,file,cb){
//         let exts = file.originalname.split('.')
//         let ext = exts[exts.length-1]
//         let tmpname=(new Date()).getTime()+parseInt(Math.random()*100)
//         cb(null,`${tmpname}.${ext}`);
//     } 
// });
// var upload = multer({ 
//     storage: storage
// });
// // 上传文件路由拦截
// router.post('/myPost',upload.single('photo'),(req,res)=>{
//     let {size,mimetype,path}=req.file;
//     let types=['jpg','jpeg','png','gif']
//     let tmpType = mimetype.split('/')[1]
//     if(size>50000000){
//         return res.send({code:1,msg:'文件太大'})
//     }else if(types.indexOf(tmpType)==-1){
//         return res.send({code:2,msg:'媒体类型错误'})
//     }else{
//         let url = `${req.file.filename}`
//         res.send({code:0,msg:'ok',img:url})
//     }
// })


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/com_img')
    },
    filename: function (req, file, cb) {
        var str = file.originalname.split('.');
        cb(null, Date.now() + '.' + str[1]);
    }
})
var upload = multer({ storage: storage });

router.post('/upload', upload.array("file", 20), (req, res) => {
    var arr = [];
    for (var i in req.files) {

        arr.push(req.files[i].path);
    }
    res.json({
        code: 0,
        data: arr
    })
})

//插入帖子的路由拦截
router.post('/myPost.php', (req, res) => {
    // let art_content = req.body.art_content;
    // let art_time = req.body.art_time;
    // let art_userid = req.body.art_userid;
    // let art_img = req.body.art_img;
    //   // 插入帖子表
    // let sql = 'insert into article values (0,?,?,?,0)';
    // comm_db.dbconnection(sql, [art_content,art_time,art_userid], (err, data) => {
    //     if (!err) {
    //         if (typeof data != 'undefined') {
    //          res.json({
    //              code:0,
    //              msg:"成功",
    //              data_img:art_img
    //          })
    //         }else{
    //             res.json({
    //                 code:1,
    //                 msg:"发帖失败",
    //                 data
    //             })
    //         }
    //     }else{
    //         res.json({
    //             code:1,
    //             msg:"发帖失败,服务器错误！",
    //             data
    //         })
    //     }
    // })

    //Promise的函数
    function read(sql) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                comm_db.dbconnection(sql, [art_content, art_time, art_userid], (err, data) => {
                    if (!err) {
                        resolve(data);
                    }
                })
            }, 1000)
        })
    }
    // 帖子表插数据
    let sql1 = 'insert into article values (0,?,?,?,0)';
    // 查询帖子表的当前帖子的a_id
    let sql2 = 'SELECT (a_id+1) as a_id FROM article ORDER BY a_id DESC LIMIT 1';
    let result = Promise.all([read(sql1), read(sql2)]);
    let art_content = req.body.art_content;
    let art_time = req.body.art_time;
    let art_userid = req.body.art_userid;
    let art_img = req.body.art_img;
    result.then((data) => {
        res.json({
            code: 0,
            msg: "成功",
            data: data,
            img: art_img
        })
        console.log(data, art_img)
    })
})

//插入帖子图片的路由拦截
router.post('/myPost_img.php', (req, res) => {
    let a_id = req.body.a_id;
    let art_img = req.body.art_img;
    //将传进来的图片路径转为数组
    let imgArr = art_img.split(',');
    //图片路径的字符串转换
    let art_imgArr = [];
    for (var z = 0; z < imgArr.length; z++) {
        art_imgArr.push(`/com_img/${imgArr[z].split('\\')[2]}`)
    }

    console.log(art_imgArr, a_id);

    // 插入帖子表
    let sql = `insert into article_img values (${a_id},'${art_imgArr[0]}')`;
    if (art_imgArr.length > 1) {
        //对sql语句进行拼接
        for (var i = 1; i < art_imgArr.length; i++) {
            sql += `,(${a_id},'${art_imgArr[i]}')`;
        }
    }
     comm_db.dbconnection(sql, [], (err, data) => {
        if (!err) {
            if (typeof data != 'undefined') {
                res.json({
                    code: 0,
                    msg: "成功",
                    data
                })
            } else {
                res.json({
                    code: 1,
                    msg: "发帖图片失败",
                })
            }
        } else {
            res.json({
                code: 2,
                msg: "发帖图片失败,服务器错误！",
                err
            })
        }
    })
})

module.exports = router;



