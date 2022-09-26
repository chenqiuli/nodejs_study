const express = require('express');
const LoginRouter = require("./route/LoginRouter");

const app = express();
app.use(express.static("static")); // 注册静态资源

app.set('views', 'views');// 模板引擎默认使用文件夹
app.set('view engine', 'ejs'); // 注册ejs模板，默认加载引擎模板的文件夹是views

// 解析post请求
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const fun1 = (req, res, next) => {
  const isValid = true;
  if (isValid) {
    console.log('token验证');
    next();
  } else {
    res.send('error');
  }
}

app.use(fun1);

app.use('/login', LoginRouter);  // 应用级中间件

app.listen(3000, () => {
  console.log('server start');
});
