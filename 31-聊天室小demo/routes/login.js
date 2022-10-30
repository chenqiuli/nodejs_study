const Router = require("koa-router");
const router = new Router();

const conn = require("../config/db.config");
const JWT = require("../utils/jwt");

router.get("/", async (ctx, next) => {
  await ctx.render("login");
});

router.post("/", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const connection = await conn();
  const [rows] = await connection.execute('select * from student where name = ? and password = ?', [username, password]);
  if (rows.length) {
    const payload = {
      username,
      password,
    };
    const token = JWT.generate(payload, '1d');
    ctx.set("authorization", token);
    ctx.body = {
      code: 0,
      msg: '登录成功'
    };
  } else {
    ctx.body = {
      code: -1,
      msg: '用户名或密码错误'
    };
  }
});

module.exports = router;