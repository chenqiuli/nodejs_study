const http = require("http");
const route = require("./route");
const api = require('./api');

const Router = {};

Object.assign(Router, route);
Object.assign(Router, api);

http.createServer((req, res) => {
  const myURL = new URL(req.url, 'http://127.0.0.1:3000/');
  // console.log(myURL.pathname);
  try {
    Router[myURL.pathname](req, res);
  } catch {
    Router['/404'](req, res);
  }
}).listen(3000, () => {
  console.log('server start');
})