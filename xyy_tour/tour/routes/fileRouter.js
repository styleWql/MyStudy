var express = require('express');
var router = express.Router();
const multer = require('multer');
const db = require('./../utils/db.js')
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

router.post('/upload',upload.single('hehe'),(req,res)=>{
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

module.exports = router;
 


