const Koa = require("koa");
const views = require("koa-views");
const static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const router = require("./routes");
const path = require("path");
const JWT = require("./utils/jwt");

const app = new Koa();

app.use(static(path.join(__dirname, "public")));

app.use(views(path.join(__dirname, "views"), { extension: 'ejs' }));

app.use(bodyParser());

app.use(async (ctx, next) => {
  // 排除登录页
  if (ctx.url.includes("login")) {
    await next();
    return;
  }
  const token = ctx.headers["authorization"]?.split(" ")[1]; // 获取token，模板页面是没有token的，token只能设置在使用ajax调取接口的路由中
  if (token) {
    const data = JWT.verify(token); // 验证token是不是正确的且还在有效期内，true/false
    // console.log(data);
    if (data) {
      // 生成新的token让客户端不会过期
      const payload = { username: data.username, password: data.password };
      const newToken = JWT.generate(payload, '1h');
      ctx.set("authorization", newToken);
      await next();
    } else {
      // 无效，返回401，让前端跳转登录页
      ctx.status = 401;
      ctx.body = { ok: 0 };
    }
  } else {
    await next();
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);