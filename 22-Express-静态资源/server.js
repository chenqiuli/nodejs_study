const express = require('express');
const LoginRouter = require("./route/LoginRouter");

const app = express();

/**
 * 配置静态资源
 * 页面上输入不需要输入static路径
 */
app.use(express.static('static'));

app.use(express.json());

app.use("/login", LoginRouter);

app.listen(3000, () => {
  console.log('server start');
});