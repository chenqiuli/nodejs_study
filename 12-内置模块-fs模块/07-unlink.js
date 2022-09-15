const fs = require('fs');

/**
 * unlink 删除文件 fs.rm("./test/a.txt")也可删除
 */
fs.unlink("./test/a.txt", (err) => {
  if (!err) {
    console.log('删除文件成功');
  } else if (err?.code === 'ENOENT') {
    console.log('该文件不存在');
  }
});

// fs.rm("./test/a.txt", (err) => {
//   if (!err) {
//     console.log('删除文件成功');
//   } else if (err?.code === 'ENOENT') {
//     console.log('该文件不存在');
//   }
// });