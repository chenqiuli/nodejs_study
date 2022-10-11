var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

require("./config/db.config.js");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
app.use((req, res, next) => {
  // console.log(req.session);
  // 排除登录页及登录接口   
  if (req.url.includes('login')) {
    next();
    return;
  }
  if (req.session.user) {
    req.session.mydate = Date.now();
    next();
  } else {
    // 是接口就返回错误码，前端自行重定向
    // 是模板页面就直接重定向
    req.url.includes('/api')
      ? res.status(401).send({ ok: 0 }) :
      res.redirect("/login");
  }
})

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/login', loginRouter)

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
