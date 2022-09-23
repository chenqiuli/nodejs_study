/** 静态资源 */
const fs = require('fs');


function render (res, path, status = 200, type = "text/html") {
  res.writeHead(status, {
    'Content-Type': `${type};charset=utf-8`
  });
  res.write(fs.readFileSync(path));
  res.end();
}

/**
 * 假设输入非以下路径的路由，服务器会崩溃，此时可以使用try...catch...捕获错误
 */
const route2 = {
  '/home': (req, res) => {
    render(res, './static/home.html');
  },
  '/login': (req, res) => {
    render(res, './static/login.html');
  },
  '/404': (req, res) => {
    render(res, './static/404.html', 404);
  },
  '/favicon.ico': (req, res) => {
    render(res, './static/favicon.ico', 200, 'image/x-icon');
  }
}

module.exports = {
  route2
};
