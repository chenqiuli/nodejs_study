const express = require('express');

const app = express();

// 写法一
app.get('/', (req, res, next) => {
  // 验证token是否过期，验证成功才发送数据
  const isVaild = true;
  if (isVaild) {
    res.data = '这是fun1的计算结果';
    next();
  } else {
    res.send('error');
  }
}, (req, res) => {
  console.log(res.data); // 获取上一个中间件的传值
  res.send('Hello World');
});

// 写法二，这种写法可以实现复用一些共用方法
const fun1 = (req, res, next) => {
  // 验证token是否过期，验证成功才发送数据
  const isVaild = true;
  if (isVaild) {
    res.data = '这是fun1的计算结果';
    next();
  } else {
    res.send('error');
  }
}

const fun2 = (req, res) => {
  console.log(res.data); // 获取上一个中间件的传值
  res.send('Hello World');
}

app.get('/', [fun1, fun2]);

// 写法三
app.get('/', [fun1], (req, res) => {
  console.log(res.data); // 获取上一个中间件的传值
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('server start');
});