const fs = require('fs');

/**
 * writeFile 在目录下写文件，目录必须先存在，文件可以不用存在，会覆盖之前的文件内容
 */
fs.writeFile("./test/a.txt", 'hello 你好', (err) => {
  console.log(err);
});