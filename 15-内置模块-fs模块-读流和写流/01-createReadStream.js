const fs = require('fs');

// 返回的结果是可读流的实例，是非流动模式
const rs = fs.createReadStream('./aaa.txt');

// 转为流动模式
const arr = [];
rs.on('data', (chunk) => {
  arr.push(chunk);
});

// 读取出来的数据是Buffer类型的，转为字符串
rs.on('end', () => {
  console.log(arr.toString());
});

rs.on('error', (err) => {
  console.log(err);
});