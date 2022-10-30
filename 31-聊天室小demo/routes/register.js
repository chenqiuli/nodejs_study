const Router = require("koa-router");
const router = new Router();

const multer = require("@koa/multer");
const upload = multer({ dest: 'public/imgs' });
const conn = require("../config/db.config");



router.get("/", async (ctx, next) => {
  await ctx.render("register");
});

router.post("/", upload.single("avatar"), async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const avatar = `/imgs/${ctx.file.filename}`;
  const connection = await conn();
  try {
    const [rows] = await connection.execute('insert into student(name,password,avatar) values(?,?,?)', [username, password, avatar]);
    if (rows?.affectedRows) {
      ctx.body = {
        code: 0,
        msg: '注册成功'
      };
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: '注册失败，该用户已存在'
    };
  }
});

module.exports = router;