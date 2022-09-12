/**
 * 假设前端想直接请求美团的数据，肯定遇到跨域，但是前端想要美团的数据怎么办呢？
 * 使用nodejs作为中间层，nodejs请求美团的接口，再聚合转发给前端。
 * nodejs - 服务器<添加cors允许跨域请求头>  美团接口 - 另一台服务器  前端 - 客户端
 * 服务器请求另一台服务器 不会遇到跨域，前端请求nodejs的服务器允许跨域
 */

const http = require('http');
const https = require('https');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  })
  if (req.url === '/api/list') {
    httpsGetMeituan((data) => res.end(data)); // 异步编程
  }
}).listen(3000);

// 获取美团的数据，接口如果是https类型的，使用https模块；如果是http类型的，使用http模块。
function httpsGetMeituan (cb) {
  let data = '';
  https.get('https://gz.meituan.com/ptapi/getComingFilms?ci=20&limit=10', (res) => {

    res.on('data', (chunk) => {
      // 请求得到的数据是数据流的格式
      data += chunk;

      // process.stdout.write(d); // 官网写法
    });

    res.on('end', () => {
      // console.log(data);
      // response.end(data);
      cb(data); // 回调
    });

  });
}