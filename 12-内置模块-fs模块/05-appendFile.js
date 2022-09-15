const fs = require('fs');

/**
 * appendFile 在文件基础上追加内容，不会覆盖之前的文件内容
 */
fs.appendFile("./test/a.txt", '嘻嘻', (err) => {
  console.log(err);
})