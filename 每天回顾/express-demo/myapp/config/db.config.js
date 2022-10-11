const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/nodejs_users').then(() => {
  console.log('成功连接到数据库');
}).catch(err => {
  throw (err);
});