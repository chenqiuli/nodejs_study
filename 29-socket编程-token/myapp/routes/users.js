var express = require('express');
var multer = require('multer');
var router = express.Router();
const UserController = require("../controller/userController");

const upload = multer({ dest: 'public/images' }); // 存放到静态资源文件夹 

/**
 * 查询所有  UserModel.find()
 * 查询指定字段   UserModel.find({}, ['username', 'age'])
 * 查询总数  UserModel.find({}, ['username', 'age']).count()
 * 待条件查询  UserModel.find({ age: 21 })
 * 排序 UserModel.find({}, ['username', 'age']).sort({ age: 1 })
 * 分页 UserModel.find({}).sort({ age: 1 }).skip((pageNum - 1) * pageSize).limit(pageSize)
 */
router.get('/', UserController.selectUser);



// 新增 avatar接收前端文件的字段，需和前端保持一致 upload.single('avatar')-单个
router.post('/', upload.array('avatar'), UserController.addUser);



// 更新 updateOne updateMany
router.put('/:id', UserController.updateUser);


// 删除 deleteOne deleteMany 
router.delete('/:id', UserController.deleteUser);


// 登录校验 
router.post('/login', UserController.validateLogin);

// 退出登录
router.get('/logout', UserController.logout);


module.exports = router;
