/**
 * 存在先后顺序问题，读取完才能写，end方法中监听是否读取完
 */

const fs = require('fs');

const rs = fs.createReadStream('./bbb.txt', 'utf-8');
const ws = fs.createWriteStream("./aaa.txt");

// 读取
let res = '';
rs.on('data', (chunk) => {
  res += chunk;
});

rs.on('end', () => {
  console.log(res);
  // 写入 
  ws.write(res);

  ws.end();
});

rs.on('error', (err) => {
  console.log(err);
});






