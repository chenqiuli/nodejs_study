/** 静态资源 */
const fs = require('fs');
const path = require('path');
const mime = require('mime');

function render (res, path, status = 200, type = "text/html") {
  res.writeHead(status, {
    'Content-Type': `${type};charset=utf-8`
  });
  res.write(fs.readFileSync(path));
  res.end();
}

function renderStaticFile (req, res) {
  const myURL = new URL(req.url, 'http://127.0.0.1:3000/');

  if (myURL.pathname === '/') {
    return false;
  }
  // 获取绝对路径 __dirname node中全局对象
  // console.log(__dirname, '/static',);
  // 拼凑路径 path.join 
  // console.log(path.join(__dirname, '/static', myURL.pathname));
  const pathname = path.join(__dirname, '/static', myURL.pathname);

  // 获取文件扩展名的Content-Type类型 mime.getType
  if (fs.existsSync(pathname)) {
    render(res, pathname, 200, mime.getType(myURL.pathname.split(".")[1]))
    return true;
  }
}

/**
 * 假设输入非以下路径的路由，服务器会崩溃，此时可以使用try...catch...捕获错误
 * 假设是引入css，js这种外部文件进html文件，不可能在下面一个路径一个路径枚举出来，所以可以在404路径中，判断如果引入的css，js等外部文件存在于static文件夹下，就返回内容
 */
const route2 = {
  '/home': (req, res) => {
    render(res, './static/home.html');
  },
  '/login': (req, res) => {
    render(res, './static/login.html');
  },
  '/404': (req, res) => {
    if (renderStaticFile(req, res)) {
      return false;
    }
    render(res, './static/404.html', 404);
  },
  '/favicon.ico': (req, res) => {
    render(res, './static/favicon.ico', 200, 'image/x-icon');
  },
  // '/css/login.css': (req, res) => {
  //   render(res, './static/css/login.css', 200, 'text/css');
  // },
}

module.exports = {
  route2
};
