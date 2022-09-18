/**
 * 1.创建一个目录
 * 2.在该目录下创建几个文件,往文件中写入内容
 * 3.删除一整个目录，  promises的写法
 */

const fs = require('fs');
const fs_promises = require('fs').promises;

// fs.mkdir('./aaa', (err) => {
//   console.log(err);
// });

const fileContent = [111, 222, 333, 444];
fileContent.forEach(item => {
  fs.writeFile(`./aaa/${item}.txt`, String(item), (err) => {
    console.log(err);
  })
});

// promise
// fs_promises.readdir('./aaa').then(data => {
//   const arr = data.map(item => fs_promises.unlink(`./aaa/${item}`));
//   console.log(arr);
//   Promise.all(arr).then(() => {
//     fs_promises.rmdir("./aaa");
//   })
// }).catch(err => {
//   console.log(err);
// });

// async-await
// fs_promises.readdir("./aaa").then(async (data) => {
//   const arr = data.map(item => fs_promises.unlink(`./aaa/${item}`));

//   await Promise.all(arr);
//   await fs_promises.rmdir("./aaa");
// });


