var express = require('express');
var router = express.Router();
const UserController = require("../controller/userController");

/**
 * 查询所有  UserModel.find()
 * 查询指定字段   UserModel.find({}, ['username', 'age'])
 * 查询总数  UserModel.find({}, ['username', 'age']).count()
 * 待条件查询  UserModel.find({ age: 21 })
 * 排序 UserModel.find({}, ['username', 'age']).sort({ age: 1 })
 * 分页 UserModel.find({}).sort({ age: 1 }).skip((pageNum - 1) * pageSize).limit(pageSize)
 */
router.get('/', UserController.selectUser);

// 新增
router.post('/', UserController.addUser);

// 更新 updateOne updateMany 
router.put('/:id', UserController.updateUser);

// 删除 deleteOne deleteMany 
router.delete('/:id', UserController.deleteUser);

// 登录校验 
router.post('/login', UserController.validateLogin);

module.exports = router;
