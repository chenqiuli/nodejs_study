
/**
 * callback 的写法
 * 路径可绝对路径也可相对路径，操作成功err返回null
 */

const fs = require('fs');

/**
 * 创建目录
 * { recursive: true }：这个参数加上，可以创建高于一层的目录，也可以重复创建目录，不会报错
 */
fs.mkdir("./test", (err) => {
  if (err?.code === 'EEXIST') {
    console.log('目录已存在');
  }
});

// fs.mkdir("./test/study", { recursive: true }, (err) => {
//   console.log(err);
//   if (err?.code === 'EEXIST') {
//     console.log('目录已存在');
//   }
// });