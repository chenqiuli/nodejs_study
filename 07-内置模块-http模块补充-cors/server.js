/**
 * 如果我想传一个json格式给前端，此时会遇到跨域
 * 添加 'Access-Control-Allow-Origin': '*' 解决cors跨域
 */

const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  const data = JSON.stringify(['1', 2]);
  res.end(data);
}).listen(3000);