const Koa = require("koa");
const router = require("./routes");
const static = require("koa-static");
const path = require("path");
const bodyParser = require("koa-bodyparser");
const views = require("koa-views");
const session = require("koa-session-minimal");
const app = new Koa();

app.use(bodyParser()); // 解析body参数

// 注册模板文件目录为views，使用ejs模板解析
app.use(views(path.join(__dirname, "views"), { extension: 'ejs' }))

// 注册public目录为静态资源，浏览器可以直接访问静态资源的资源 
// localhost:3000/center.html
app.use(static(path.join(__dirname, "public")));

// 设置session
app.use(session({
  key: 'cookie_name',
  cookie: {
    maxAge: 1000 * 60 * 60, // 设置一个小时过期
  }
}));

// 拦截中间件
app.use(async (ctx, next) => {
  if (ctx.url.includes("login")) {
    await next();
    return;
  }
  if (ctx.session.user) {
    // 访问成功，重新计算cookie过期时间
    ctx.session.date = Date.now();
    await next();
  } else {
    ctx.redirect("/login");
  }
})

// 注册成应用级中间件
// router.allowedMethods() 客户端请求路径错误，提示 405 错误，意思是请求方法不对，该响应必须返回一个 Allow 头信息表示当前资源能够接受的请求方法的列表
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
