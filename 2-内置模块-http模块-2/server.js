/**
 * 在浏览器输入不同的路径/接口，服务器响应不同的页面/数据和接口状态
 * 模块化开发，把数据和状态抽离出去
 */

const http = require('http');
const renderHtml = require("./moduleRenderHtml.js");
const { renderStatus } = require("./moduleRenderStatus.js");

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  console.log(req.url); // url的路由
  res.writeHead(renderStatus(req.url), { 'Content-type': 'text/html;charset=utf-8' });
  let resHtml = renderHtml(req.url);
  res.write(resHtml);
  res.end();
});

server.listen(3000, () => {
  console.log('server start');
})