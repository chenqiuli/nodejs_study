/**
 * 因为项目中已经有model，所以这里的M就用services来替代
 * m层 主要负责与数据库打交道
 * 
 */

const UserModel = require("../model/UserModel");

const UserSerive = {
  addUser: (username, password, age) => {
    return UserModel.create({
      username,
      password,
      age
    });
  },

  updateUser: (_id, username, password, age) => {
    return UserModel.updateOne({ _id }, {
      username,
      password,
      age
    })
  },

  deleteUser: (_id) => {
    return UserModel.deleteOne({ _id });
  },

  selectUser: (pageNum, pageSize) => {
    return Promise.all([
      UserModel.find({}).sort({ age: 1 }).skip((pageNum - 1) * pageSize).limit(pageSize),
      UserModel.find({}).count()
    ]);
  },

  validateLogin: (username, password) => {
    // find方法 返回数组
    return UserModel.find({ username, password });
  },
}

module.exports = UserSerive;