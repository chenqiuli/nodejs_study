const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.query);  // 获取get请求query参数
  res.send('login success -get');
});

router.post('/', (req, res) => {
  /**
   * 前端请求是key-value pairs的格式：Content-Type = applicaiton/x-www-form-urlencoded
   * undefined
   * 在主应用配置app.use(express.urlencoded({ extended: false }))
   * 成功获取
   */
  /**
   * 前端请求是key-value pairs的格式：Content-Type = applicaiton/json
   * {}
   * 在主应用配置app.use(express.json())
   * 成功获取
   */
  console.log(req.body);
  res.send({
    code: 200,
    message: 'success'
  });
});


module.exports = router;