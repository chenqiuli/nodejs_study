const Router = require("koa-router");
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = [111, 222, 333];
}).post("/", (ctx, next) => {
  console.log(ctx);
  ctx.body = {
    ok: 1,
    msg: 'add success',
  }
}).put("/:id", (ctx, next) => {
  console.log(ctx.params);
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

module.exports = router;

// var JWT = require("../utils/jwt");
// const token = JWT.generate({ name: 'qiuli' }, '10s');
// console.log(token);
// const data = JWT.verify(token);
// console.log(data);
// setTimeout(() => {
//   const data = JWT.verify(token);
//   console.log(data);
// }, 11000);