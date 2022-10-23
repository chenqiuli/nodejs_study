/**
 * 创建用户模型并导出
 * Schema - 对应mongodb中field 列
 * Model - 对应mongodb中collection 表
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  age: Number,
  avatar: String,
});

// 模型为user，创建出来后mongodb中集合名为users
const UserModel = mongoose.model('user', userSchema);

// 返回一个promise对象，接口中使用该模型使用promise语法
module.exports = UserModel;