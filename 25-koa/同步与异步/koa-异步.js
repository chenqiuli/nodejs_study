const Koa = require("koa");
const app = new Koa();

/**
 * koa在第一个中间件执行了next()，它是把控制权交给了下一个中间件，等它执行完全部的代码再把控制权交还给上一个中间件，所以能很好地实现异步
 * 第一个中间件要await一下next()
 */

app.use(async (ctx, next) => {
  if (ctx.url === '/favicon.ico') return;
  console.log(111);
  await next();
  console.log(444);

  ctx.body = "jjjk";
});

app.use(async (ctx, next) => {
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