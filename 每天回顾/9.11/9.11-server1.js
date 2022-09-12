/**
 * 需求：
 * 1、通过浏览器输入的网址，拿到网址响应不同的数据回去，不存在的网址返回404，成功返回200
 * 2、拿到网址，处理网址的参数成json格式，再从json格式转为string
 * 3、拿到网址问号后面的参数，作为内容返回去给客户端
 */


const http = require('http');
const { URL } = require('url');

const renderResult = (url, obj) => {
  let result;
  let status;
  switch (url) {
    case '/home':
      result = '<h1>home</h1>';
      status = 200;
      break;
    case '/api/cart':
      result = JSON.stringify(['牛仔裤', '连衣裙', 'hat'])
      status = 200;
      break;
    default:
      result = 'not found';
      status = 404;
  }
  return {
    result: (Object.keys(obj)?.length && status === 200) ? JSON.stringify(obj) : result,
    status
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1:3000/');
  const queryParams = url.searchParams; // query的json

  const quertString = decodeURI(queryParams.toString()); // json -> string

  const queryObjValue = {};
  for (const [key, value] of queryParams) {
    queryObjValue[key] = value;
  }

  const { result, status } = renderResult(url.pathname, queryObjValue);
  res.writeHead(status, { 'Content-type': 'text/html;charset=utf-8' });
  res.write(result);
  res.end();
});

server.listen(3000, () => {
  console.log('server start');
})