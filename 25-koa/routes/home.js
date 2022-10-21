const Router = require("koa-router");
const router = new Router();

// 返回模板文件的内容 
// 返回模板文件这种方式，是前后不分离的方式，需要等待文件解析完毕才返回，所以要await
router.get("/", async (ctx, next) => {
  await ctx.render("home");
});


module.exports = router;