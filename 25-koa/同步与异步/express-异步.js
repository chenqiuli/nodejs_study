const express = require("express");
const app = express();

/**
 * express实现异步：只能是按照流水线式的实现，
 * 在这个例子中，第一个中间件的next()执行到下一个中间件，但是下一个中间件有一个异步需要等待一秒，所以此时expres是不会等待这一秒的，会继续走next()后面的代码，因此不推荐这么写
 * 
app.use((req, res, next) => {
  if (req.url === "/favicon.ico") return;
  console.log(111);
  next();
});
app.use(async (req, res, next) => {
  console.log(222);
  // 异步  
  await delay(1000);
  console.log(333);
  console.log(444);
  res.send('哈哈哈');
});

流水式写法，要返回客户端的写在最后面
 */

app.use(async (req, res, next) => {
  if (req.url === "/favicon.ico") return;
  console.log(111);
  await next();
  console.log(444);
  res.send('哈哈哈');
});

app.use(async (req, res, next) => {
  console.log(222);
  // 异步  
  await delay(1000);
  console.log(333);
});

app.listen(3000);

function delay (time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}