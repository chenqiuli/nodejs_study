const Router = require("koa-router");
const router = new Router(); // 注册成路由级中间件，合并起来

const listRouter = require("./list");
const userRouter = require("./user");
const homeRouter = require("./home");
const loginRouter = require("./login");


// 统一为某个路由模块接口加前缀
// router.prefix("/api");  // 加了这一行代码重定向不起作用

// 注册成路由级中间件，合并起来
router.use("/list", listRouter.routes());
router.use("/user", userRouter.routes());
router.use("/home", homeRouter.routes());
router.use("/login", loginRouter.routes());


// 重定向
router.redirect("/", "/home");


module.exports = router;


