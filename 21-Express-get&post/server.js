const express = require('express');
const LoginRouter = require('./route/LoginRouter');

const app = express();

// express版本在4.0以上
// 解析post请求是application/x-www-form-urlencoded的格式
app.use(express.urlencoded({ extended: false }));
// express版本在4.0以上
// 解析post请求是application/json的格式
app.use(express.json());

app.use('/login', LoginRouter);

app.listen(3000, () => {
  console.log('server start');
});