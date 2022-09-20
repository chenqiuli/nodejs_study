/**
 * 服务器给客户端返回去一个数据，没有压缩前是大小多少
 * 经过压缩后，大小多少
 * 使用pipe管道进行压缩，并通过Content-Encoding告知浏览器以哪种编码格式进行解压
 */


const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();

http.createServer((req, res) => {
  // req是一个可读流，res就是一个可写流 
  const rs = fs.createReadStream("./aaa.md");

  res.writeHead(200, {
    'Content-Type': 'application/json;charset=utf-8',
    'Content-Encoding': 'gzip',
  });

  rs.pipe(gzip).pipe(res);
}).listen(3000);