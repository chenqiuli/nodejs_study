const mongoose = require('mongoose');

/**
 * 连接mongodb，连接成功返回一个promise对象
 */
mongoose.connect('mongodb://127.0.0.1:27017/nodejs_users').then(() => {
  console.log('成功连接mogodb数据库');
}).catch(err => {
  console.log(err);
});