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
var uploadRouter = require('./routes/upload');
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


// 自动生成一个匹配cookie的session对象
app.use(session({
  secret: 'username', // 生成session的签名
  resave: true, // 重启服务器，自动重新计时cookie
  saveUninitialized: true, // 强制为初始化的session存储
  cookie: {
    maxAge: 1000 * 60 * 10, // 过期时间，一分钟     
    secure: false,  // 为true时表示只有在https协议时才能访问cookie
  },
  rolling: true, // 为true表示超时前刷新，cookie会重新计时
  // 把sessionid存到数据库中，重启服务器不会session不会过期
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/nodejs_session', // 新创建一个session的数据库
    ttl: 1000 * 60 * 10,
  }),
}));

// 应用级中间件
// app.use((req, res, next) => {
//   // console.log(req.session);
//   // 排除登录页及登录接口   
//   if (req.url.includes('login')) {
//     next();
//     return;
//   }
//   if (req.session.user) {
//     req.session.mydate = Date.now();
//     next();
//   } else {
//     // 是接口就返回错误码，前端自行重定向
//     // 是模板页面就直接重定向
//     req.url.includes('/api')
//       ? res.status(401).send({ ok: 0 }) :
//       res.redirect("/login");
//   }
// })


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
app.use('/upload', uploadRouter);


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
