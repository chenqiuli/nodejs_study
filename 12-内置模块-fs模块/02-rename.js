const fs = require('fs');

/**
 * rename  重命名文件目录或文件 
 */
fs.rename("./test", "./newTest", (err) => {
  if (err?.code === 'ENOENT') {
    console.log("目录不存在");
  }
});

// fs.rename("./newTest/a.txt", "./newTest/b.txt", (err) => {
//   if (err?.code === 'ENOENT') {
//     console.log("目录不存在");
//   }
// });