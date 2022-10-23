const Router = require("koa-router");
const router = new Router();

router.get("/", async (ctx) => {
  await ctx.render("upload", { title: "uplaod" });
});

module.exports = router;