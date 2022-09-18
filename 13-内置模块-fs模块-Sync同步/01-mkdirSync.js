/**
 * 同步的写法，不需要写回调
 */
const fs = require('fs');

// 同步创建test文件夹，不管test文件夹存不存在
fs.mkdirSync("./test", {
  recursive: true
});