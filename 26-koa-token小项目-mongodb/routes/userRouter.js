const Router = require("koa-router");
const multer = require("@koa/multer");
const UserModel = require("../model/UserModel");

const router = new Router();
const upload = multer({ dest: 'public/uploads' });

router.get("/", async (ctx, next) => {
  await ctx.render("user");
});

router.post("/", async (ctx, next) => {
  const data = await UserModel.find({});
  // console.log(data);
  ctx.body = data;
});

// 上传接口，前端的Content-type必须设置为multipart/form-data，后端接收需要借助@koa/multer插件才可以接收到参数
// 单文件上传
// router.post("/upload", upload.single("avatar"), (ctx) => {
//   console.log(ctx.request.body, ctx.file);
//   ctx.body = { ok: 1 };
// });

// 多文件上传
router.post("/upload", upload.array("avatar"), async (ctx) => {
  // console.log(ctx.request.body, ctx.files);
  const { username, password, age } = ctx.request.body;
  const fileList = [];
  ctx.files?.forEach(item => {
    fileList.push(`uploads/${item.filename}`);
  });
  const avatar = ctx.files ? fileList.join(",") : "";
  // console.log(fileList.join(","), 'fileList');
  await UserModel.create({
    username,
    password,
    age,
    avatar
  }).then(() => {
    ctx.body = { ok: 1 };
  });
});

module.exports = router;


