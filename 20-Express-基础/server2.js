/**
 * 应用级中间件：挂在app上面的，注册和使用，需要注意调用顺序
 * app.use(fun1) 万能匹配中间件
 * app.use('/home', fun1) home的应用级中间件
 * app.use('/api', 路由模块)
 * 
 * 路由级别中间件
 * express.Router()
 * 
 * 错误中间件：使用万能级别中间件，写在最后面
 * res.status(404).send('404')
 * 
 * 内置中间件
 * 
 * 第三方中间件
 */

const express = require('express');
const router = require('./router/HomeRouter');

const app = express();

// 不会执行app.use(fun1) 
app.get('/login', (req, res) => {
  res.send('login');
})

const fun1 = (req, res, next) => {
  const isValid = true;
  if (isValid) {
    // console.log('验证token');
    next();
  } else {
    console.log('error');
  }
}

app.use(fun1);

app.use('/home', router);

app.get('/list/:userId/:bookId', (req, res) => {
  console.log(req.params); // { userId: '1', bookId: '2' }
  res.send('list')
})

app.use((req, res) => {
  res.status(404).send('404');
})

app.listen(3000);


