/**
 * 知识回顾：jsonp是什么？jsonp的原理是什么？优缺点是什么
 * jsonp是前端解决跨域方式之一。
 * 原理：利用script标签的scr属性没有跨域限制来实现的，将引用的外部文件的内容当做js代码来执行
 * 步骤：1.前端提前定义好callback函数
 *      2.前端动态创建一个script标签， scr属性指向后端请求路径，在路径后面添加callback参数，插入到body中
 *      3.前端请求后端，后端收到前端的请求，解析callback参数，后端返回给前端一个函数，函数名使用callback名，函数返回的内容需要为json格式
 *      4.前端会自动取到后端返回的数据
 * 优点：兼容性好，在一些老的浏览器也可以执行
 * 缺点：只能进行get请求，因为jsonp是通过请求问号后面的callback。后端传回来的是函数
 */

const http = require('http');
const { URL } = require('url');

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1:3000/');
  console.log(url.searchParams.get('callback'));
  const callbackName = url.searchParams.get('callback');
  res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
  const data = `${callbackName} (${JSON.stringify(['1', 2])})`
  res.end(data);
}).listen(3000);