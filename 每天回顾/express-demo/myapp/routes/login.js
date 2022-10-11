const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('login', { title: '登录页' });
});

module.exports = router;