var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log(req.cookies); // 获取前端的cookies
  res.cookie('name', 'qiuli').cookie("age", 18);
  res.render('index', { title: 'Express' });
});

module.exports = router;
