const Koa = require("koa");
const path = require("path");
const views = require("koa-views");
const router = require("./routes");

const app = new Koa();

app.use(views(path.join(__dirname, "views"), { extension: 'ejs' }));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);