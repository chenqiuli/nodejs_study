## 一、koa 与 express 的区别

### 1. express 周边生态更加成熟，入门门槛低，开箱即用，callback 实现异步流程，req 和 res 对象，中间件是线性模型，流水线执行

### 2. koa 入门门槛比 express 高，async await 实现异步流程，更轻量，context 对象（封装了 req 和 res 对象），中间件是洋葱模型，执行下一个中间件把控制权给了下一个中间件，下一个中间件执行完了，再把控制权返回去，所以一定会等下一个中间件执行完的

## 二、安装 [koa](https://www.koajs.com.cn/)

```bash
npm init
npm i koa -S
```

```js
const Koa = require('koa');
const app = new Koa();

app.use((ctx, next) => {
  ctx.body = 'hello world';
});

app.listen(3000);
```

## 三、[koa-router](https://github.com/koajs/router/blob/HEAD/API.md)

```bash
npm i koa-router -S
```

### 1、router.allowedMethods() 客户端请求路径错误，提示 405 错误，意思是请求方法不对，该响应必须返回一个 Allow 头信息表示当前资源能够接受的请求方法的列表

```js
// app.js
const router = require('./routes');
app.use(router.routes());

// routes/index.js
const Router = require('koa-router');
const router = new Router();

const ChatRouter = require('./chat');

router.use('/chat', ChatRouter.routes()).use(ChatRouter.allowedMethods());

// 统一为某个路由模块接口加前缀
router.prefix('/api');

// 重定向
router.redirect('/', '/home');

module.exports = router;

// routes/chat.js
const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
  await ctx.render('chat');
});

module.exports = router;
```

## 四、koa-static 设置静态资源

```bash
npm i koa-static -S
```

```js
const static = require('koa-static');
const path = require('path');
// 注册public目录为静态资源，浏览器可以直接访问静态资源的资源
app.use(static(path.join(__dirname, 'public')));
```

## 五、获取请求参数

- get 请求：ctx.query ctx.querystring

- 动态路由：ctx.params

- post 请求：ctx.request.body ，借助 koa-bodyparser

```js
const bodyparser = require('koa-bodyparser');
app.use(bodyparser()); // 编译获取body实体
```

## 六、响应前端数据

### ctx.body = 'hello world';

## 七、解析模板文件，服务器控制路由的方式-前后不分离

```bash
npm i ejs koa-views -S
```

```js
const views = require('koa-views');
// 注册模板文件目录为views，使用ejs模板解析
app.use(views(path.join(__dirname, 'views'), { extension: 'ejs' }));

// 返回模板文件的内容
// 返回模板文件这种方式，是前后不分离的方式，需要等待文件解析完毕才返回，所以要await
router.get('/', async (ctx, next) => {
  await ctx.render('home');
});
```

## 八、cookie 与 session

- 获取 cookie ：ctx.cookies.get("name")

- 设置 cookie : ctx.cookies.set("locaiton","guangzhou")

## 九、cookie+session 登录鉴权

```bash
npm i  koa-session-minimal -S
```

### 步骤：

- 1、使用 koa-session-minimal 设置一个 sessionid，客户端登录成功往 sessionid 添加标识，同时存至客户端 cookie

- 2、在路由前添加一个拦截中间件，如果是登录相关的路由放行，如果 sessionid 有标识就放行，同时重新设置生成新的 sessionid，防止用户一直在用系统而过时了，否则就重定向到登录页。

```js
const session = require('koa-session-minimal');
// 设置session
app.use(
  session({
    key: 'cookie_name',
    cookie: {
      maxAge: 1000 * 60 * 60, // 设置一个小时过期
    },
  })
);
// 拦截中间件
app.use(async (ctx, next) => {
  if (ctx.url.includes('login')) {
    await next();
    return;
  }
  if (ctx.session.user) {
    // 访问成功，重新生成cookie过期时间
    ctx.session.date = Date.now();
    await next();
  } else {
    ctx.redirect('/login');
  }
});

router.post('/login', (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (username === 'qiuli' && password === '123') {
    ctx.session.user = {
      username: 'qiuli',
    };
    ctx.body = {
      ok: 1,
    };
  } else {
    ctx.body = {
      ok: 1,
    };
  }
});
```

## 十、json web token

```bash
npm i jsonwebtoken -S
```

## 十一、文件上传

```bash
npm i @koa/multer multer -S
```

## 十二、nodejs 操作 mongodb，连接 mongodb，并存储数据，跟 express 一样

```bash
npm i mongoose -S
```

- 步骤：

  - cmd 打开连接 mongodb

  - node 连接 mongodb

  - 新建模型

  - 使用模型操作文档对象，异步增删改查 async/await

## 十三、nodejs 操作 Mysql

```bash
npm i mysql2 -S
```

```js
// 封装基于mysql2的请求
async function conn() {
  const mysql = require('mysql2/promise');
  const config = {
    host: '127.0.0.1',
    port: '3306',
    user: 'qiu',
    password: '123456',
    database: 'test',
  };
  const connection = await mysql.createConnection(config);
  return connection;
}

module.exports = conn;

// 在路由接口中使用
const conn = require('../config/db.config');

router.get('/home', async (ctx) => {
  const { name } = ctx.query;
  const connection = await conn();
  // 不带参数查询
  // const [rows] = await connection.execute('select s.name as sname,s.class_id,c.name as cname from student s inner join classes c on s.class_id = c.id');
  // 带参数查询
  const [
    rows,
  ] = await connection.execute('select * from student where name = ?', [name]);
  console.log(rows); // 数组
  ctx.body = rows;
});
```
