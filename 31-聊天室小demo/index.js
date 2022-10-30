const Koa = require("koa");
const app = new Koa();

const path = require("path");
const views = require("koa-views");
app.use(views(path.join(__dirname, "views"), { extension: "ejs" }));

const static = require("koa-static");
app.use(static(path.join(__dirname, "public")));

const bodyparser = require("koa-bodyparser");
app.use(bodyparser());

const router = require("./routes");
app.use(router.routes());

// 引入webSocketServer服务器
const http = require("http");
const server = http.createServer(app.callback()); // server结合了koa的端口和webSocket的端口
const webSocketServer = require("./webSocketServer");
webSocketServer(server);

server.listen(3000, () => {
  console.log("server start");
});

