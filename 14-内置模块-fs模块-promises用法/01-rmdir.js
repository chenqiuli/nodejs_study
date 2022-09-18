/**
 * 例子：aaa文件夹下存在很多个文件，如果用rmdir删除目录，需要目录为空
 * 因此需要先把子文件全部删掉，所以这里有个先后顺序，必须等子文件全部删掉，才可以删除目录
 * rmdir 和 unlink 都是异步的办法，一个在执行的时候，另一个也会执行
 * 所以需要等待前面的执行完再执行后面的语句
 */

const fs = require('fs').promises;

/* 第一种：promise内还有promise，回调地狱 */
// fs.readdir("./aaa").then(data => {
//   console.log(data);

//   const arr = [];

//   data.forEach(item => {
//     arr.push(fs.unlink(`./aaa/${item}`));
//   });
//   console.log(arr);

//   Promise.all(arr).then(() => {
//     fs.rmdir("./aaa");
//   })

// }).catch(err => {
//   console.log(err);
// })

/* 第二种：promise内还有promise，也有回调地狱 */
// fs.readdir("./aaa").then(async (data) => {
//   const arr = data.map(item => fs.unlink(`./aaa/${item}`))
//   console.log(arr);

//   Promise.all(arr).then(() => {
//     fs.rmdir("./aaa");
//   });
// }).catch(err => {
//   console.log(err);
// });


/* 第三种：使用promise的语法糖async-await，优雅解决回调地狱 */
fs.readdir("./aaa").then(async (data) => {
  const arr = data.map(item => fs.unlink(`./aaa/${item}`))
  console.log(arr);
  await Promise.all(arr);
  await fs.rmdir("./aaa");

}).catch(err => {
  console.log(err);
})