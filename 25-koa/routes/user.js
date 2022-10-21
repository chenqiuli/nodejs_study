const Router = require("koa-router");
const router = new Router();

router.get("/", (ctx, next) => {
  console.log(ctx.query, ctx.querystring); //  { username: 'qiuli', age: '12' } username=qiuli&age=12
  ctx.body = ['aaa', 'bbb', 'ccc'];
}).post("/", (ctx, next) => {
  console.log(ctx.request.body); // { username: 'qiuli', age: 100 }
  ctx.body = {
    ok: 1,
    msg: 'add success',
  }
}).put("/:id", (ctx, next) => {
  console.log(ctx.params); // { id: '1' }
  ctx.body = {
    ok: 1,
    msg: 'put success',
  }
}).del("/:id", (ctx, next) => {
  ctx.body = {
    ok: 1,
    msg: 'del success',
  }
});

router.post("/login", (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (username === "qiuli" && password === "123") {
    ctx.session.user = {
      username: 'qiuli'
    }
    ctx.body = {
      ok: 1
    }
  } else {
    ctx.body = {
      ok: 1
    }
  }
})

module.exports = router;