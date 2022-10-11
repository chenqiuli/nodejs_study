var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log(req.cookies); // 获取前端的cookies
  res.render('index', { title: '用户管理系统' });
});

module.exports = router;
