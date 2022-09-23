/**
 * 根据页面输入不同的路径，返回不同的静态资源页面给浏览器
 * 使用fs模块读取静态资源文件
 * Ctrl + F5  渲染favicon.ico
 */
const http = require('http');

const Router = {};

// 注册路由，封装成一个方法
function assignRouter (obj, ...rest) {
  // rest是一个数组
  Object.assign(Router, obj, ...rest);
}



function server () {
  http.createServer((req, res) => {
    const myURL = new URL(req.url, 'http://127.0.0.1');
    console.log(myURL.pathname);
    try {
      Router[myURL.pathname](req, res);
    } catch (error) {
      Router['/404'](req, res);
    }
  }).listen(3000, () => {
    console.log('server start');
  });
}

module.exports = {
  server,
  assignRouter
};

