/**
 * url.xxx 这种写法是旧版写法
 */

const http = require('http');
const url = require('url');

http.createServer((req, res) => {
  console.log(url.parse(req.url)); // 解析url的信息，转成json
  const pathname = url.parse(req.url).pathname;
  const urlObj = url.parse(req.url, true); // get请求后面问号的参数，把query转换为json格式 
  console.log(urlObj.query);
}).listen(3000, () => {
  console.log('server start');
});



console.log(url.format({
  protocol: 'https',
  hostname: 'example.com',
  pathname: '/some/path',
  query: {
    page: 1,
    format: 'json'
  }
})); // https://example.com/some/path?page=1&format=json

// 拼接url
console.log(url.resolve('/one/two/three', 'four'));         // '/one/two/four'
console.log(url.resolve('/one/two/three/', 'four'));         // '/one/two/three/four'
console.log(url.resolve('http://example.com/', '/one'));    // 'http://example.com/one'
console.log(url.resolve('http://example.com/one', '/two')); // 'http://example.com/two'
console.log(url.resolve('http://example.com/api/one/home', '/two')); // 'http://example.com/two'
