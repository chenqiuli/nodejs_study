const http = require('http');

http.createServer((req, res) => {
  // req 接收浏览器的参数
  // res 返回渲染的内容 

  // res.write('hello world1');
  // res.write('hello world2');
  // res.end('[1,2,3]');

  // res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });  
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.write(`
    <html>
      <b>hello world</b>
      <a>你好</a>
    </html>
  `);
  res.end();
}).listen(3000, () => {
  console.log('server start');
});

// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.setHeader('Content-type', 'application/json');
//   res.write('hello world');
//   res.write('你好');
//   res.end();
// });

// server.listen(3000, () => {
//   console.log('listen on port 3000');
// });