const mongoose = require('mongoose');

/**
 * 连接mongodb，连接成功返回一个promise对象
 */
mongoose.connect('mongodb://127.0.0.1:27017/nodejs_users', (err) => {
  if (!err) {
    console.log('连接成功');
  } else {
    throw err;
  }
});