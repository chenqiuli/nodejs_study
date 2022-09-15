const fs = require('fs');

/**
 * rmdir 删除目录，目录下如果有子目录或者文件，删不掉
 * 可以利用rm强制删除，或者readdir遍历所有的文件，然后删除文件，再去删除目录
 */
fs.rmdir("./test", (err) => {
  console.log(err);
});


/**
 * rm { force: true, recursive: true } 强制删除整个目录
 */
// fs.rm("./test", {
//   force: true,
//   recursive: true,
// }, (err) => {
//   console.log(err);
// });

/**
 * test目录下有a.txt,hhh.html,test2子目录，必须先删除了所有的孩子，才能删test父目录
 */
// fs.readdir("./test", (err, files) => {
//   // console.log(err, files);
//   const data = deep(files);
//   console.log(data, 'data');
// });

// const deep = (files) => {
//   // console.log(files);
//   files?.forEach(item => {
//     fs.stat(`./test/${item}`, (err, stats) => {
//       if (stats?.isFile()) {
//         // 文件
//         return item.split(",");
//       } else {
//         // 目录
//         fs.readdir(`./test/${item}`, (err, subFiles) => {
//           return `./test/${item}/` + deep(subFiles);
//         });
//       }
//     });
//   });
// }