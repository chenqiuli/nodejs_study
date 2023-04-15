/**
 * url.xxx 这种写法是旧版写法
 * new URL(input[, base]) 这种是新版写法
 */

const http = require('http');
const { URL } = require('url');

http.createServer((req, res) => {
  const myURL = new URL(req.url, 'http://127.0.0.1:3000/');
  // console.log(myURL);// 拼凑url， 转成json
  const pathname = myURL.pathname;
  const searchParams = myURL.searchParams;// searchParams 是一个迭代器，可以进行增删改查+遍历
  console.log(searchParams.get('name')); // home
  console.log(searchParams.toString()); // name=home&age=100
  // es6方法遍历对象
  for (const [key, value] of searchParams) {
    console.log(key, value);
    // name home
    // age 100
  }

}).listen(3000, () => {
  console.log('server start');
});



