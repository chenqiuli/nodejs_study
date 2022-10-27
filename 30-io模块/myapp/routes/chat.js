var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('chat', { title: '聊天室' });
});

module.exports = router;
