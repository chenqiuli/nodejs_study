const fs = require('fs');


/**
 * readdir 读取某个目录下的子目录和文件的集合  
 * 如果子目录下还有文件，读取不到
 */
fs.readdir("./test", (err, files) => {
  console.log(err, files);
}); 