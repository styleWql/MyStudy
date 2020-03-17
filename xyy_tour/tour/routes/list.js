var express = require('express');
var router = express.Router();
// const db = require('./../utils/db.js')
/* GET home page. */
router.get(['/list','/list.html'], function(req, res, next) {
  res.render('list', { title: 'Express'});

  router.get('/getimg.jsp', function(req, res, next) {
    let formData=req.query.formData
    console.log(formData);
    // res.json({
    //   code:0,
    //   msg:'评论成功'
    //   // data
    // })
    
  });

});
module.exports = router;