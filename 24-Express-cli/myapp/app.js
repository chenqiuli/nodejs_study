var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 解析cookie
var logger = require('morgan'); // 日志记录
var session = require('express-session'); // 给客户端生成cookie，服务器生成session
var MongoStore = require('connect-mongo');  // 把session存到数据库

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var JWT = require('./utils/jwt');

require("./config/db.config.js"); // 连接mongodb

var app = express();

// view engine setup 设置模板文件及引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());// 解析post请求body请求体
app.use(express.urlencoded({ extended: false }));// 解析post请求formData请求
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 设置静态资源文件夹

// 应用级中间件
app.use((req, res, next) => {
  // 排除登录页及登录接口   
  if (req.url.includes('login')) {
    next();
    return;
  }
  // 校验token
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    const payload = JWT.verify(token);
    if (payload) {
      // 每次请求重新返回一个新的token，让客户端重新计时
      const newToken = JWT.generate({ username: payload.username, _id: payload._id });
      res.header('Authorization', newToken);
      next();
    } else {
      res.status(401).send({ ok: 0 });
    }
  } else {
    // 路由页面/ 页面放行
    next();
  }
})

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/login', loginRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
