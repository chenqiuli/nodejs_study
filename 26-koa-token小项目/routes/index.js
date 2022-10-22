const Router = require("koa-router");
const loginRouter = require("./loginRouter");
const userRouter = require("./userRouter");

const router = new Router();

router.use("/login", loginRouter.routes());
router.use("/users", userRouter.routes());

router.redirect("/", "/users");

module.exports = router;