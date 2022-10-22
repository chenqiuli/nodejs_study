const Router = require("koa-router");
const router = new Router();

router.get("/", async (ctx, next) => {
  await ctx.render("user");
});

router.post("/", (ctx, next) => {
  ctx.body = [{
    _id: 1,
    username: 'aaa',
    password: 123,
    age: 10,
  }, {
    _id: 2,
    username: 'bbb',
    password: 123,
    age: 20,
  }];
});

module.exports = router;


