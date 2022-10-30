const Router = require("koa-router");
const router = new Router();

const ChatRouter = require("./chat");
const loginRouter = require("./login");
const registerRouter = require("./register");


router.use("/chat", ChatRouter.routes()).use(ChatRouter.allowedMethods());
router.use("/login", loginRouter.routes()).use(loginRouter.allowedMethods());
router.use("/register", registerRouter.routes()).use(registerRouter.allowedMethods());


router.redirect("/", "/chat");

module.exports = router;
