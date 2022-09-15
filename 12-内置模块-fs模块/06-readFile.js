const fs = require('fs');

/**
 * readFile 读取某个文件的内容
 * 默认读出来是Buffer类型的，转成utf-8
 */
fs.readFile('./test/a.txt', {
  encoding: 'utf-8'
}, (err, data) => {
  console.log(err, data);
})