/**
 * 在浏览器输入不同的路径/接口，服务器响应不同的页面/数据和接口状态
 * 模块化开发，把数据和状态抽离出去
 * 
 * 问题：浏览器url输入 /home?name=home，正常是/home路径，但是后面如果带了参数，会变成404，所以可以利用url模块处理一下
 */

const http = require('http');
const { URL } = require('url');
const renderHtml = require("./moduleRenderHtml.js");
const { renderStatus } = require("./moduleRenderStatus.js");

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  console.log(req.url); // url的路由 
  const myURL = new URL(req.url, 'http://127.0.0.1:3000/');
  console.log(myURL);
  res.writeHead(renderStatus(myURL.pathname), { 'Content-type': 'text/html;charset=utf-8' });
  let resHtml = renderHtml(myURL.pathname);
  res.write(resHtml);
  res.end();
});

server.listen(3000, () => {
  console.log('server start');
})