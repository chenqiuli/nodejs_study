const Router = require("koa-router");
const JWT = require("../utils/jwt");

const router = new Router();


router.get("/", async (ctx, next) => {
  await ctx.render("login");
});

router.post("/validate", (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (username === 'admin' && password === "123") {
    const payload = {
      username,
      password
    };
    const token = JWT.generate(payload, '1h');
    ctx.set("authorization", token); // 返回在headers头信息中
    ctx.body = {
      ok: 1
    };
  } else {
    ctx.body = {
      ok: 0
    };
  }
});

module.exports = router;