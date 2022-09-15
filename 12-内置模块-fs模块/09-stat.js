const fs = require('fs');

/**
 * stat 判断所传路径是目录还是文件
 */
fs.stat("./test", (err, stats) => {
  console.log(err, stats.isDirectory());
  console.log(err, stats.isFile());
});