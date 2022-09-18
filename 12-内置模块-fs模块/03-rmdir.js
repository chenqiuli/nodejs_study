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
 * test目录下有a.txt,hhh.html，必须先删除了所有的子文件，才能删test父目录
 */
fs.readdir("./test", (err, files) => {
  console.log(err, files);
  /**
   * 如果files很多，那这里会执行很久，必须等这里先执行完，不然会报noempty的error，才执行rmdir
   * 等文件全部都执行完，可以使用同步的方式，同步会阻塞后面的代码
   * 也可以使用promise的方式，等前面的代码执行完，再执行后面的代码
   * 看
   */
  files.forEach(item => {
    fs.unlink(`./test/${item}`, (err) => {
      console.log(err);
    });
  });

  fs.rmdir('./test', (err) => {
    console.log(err);
  });
});
