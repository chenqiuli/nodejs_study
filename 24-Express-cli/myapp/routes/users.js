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


/**
 * 
 * @api {get} /api/users?pageNum=1&pageSize=10 查询用户信息
 * @apiName getUser
 * @apiGroup userGroup
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {Number} pageNum 页码，必填
 * @apiParam  {Number} pageSize 页数，必填
 * 
 * 
 * @apiSuccess (200) {Number} ok 1
 * 
 * @apiSuccessExample {Number} 返回成功样例:
 * {
 *     ok : 1
 * }
 */
router.get('/', UserController.selectUser);


/**
 * 
 * @api {post} /api/users 添加用户
 * @apiName addUser
 * @apiGroup userGroup
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} username 用户名，必填
 * @apiParam  {String} password 密码，必填
 * @apiParam  {Number} age 年龄
 * @apiParam  {File} avatar 头像，多个上传多个
 * 
 * 
 * @apiParamExample  {multipart/form-data} Request-Example:
 * {
 *     username: '张三',
 *     password: '123',
 *     age: 12,
 *     avatar: File对象1,
 *     avatar: File对象2,
 * }
 * 
 * @apiSuccess (200) {Number} ok 1
 * 
 * @apiSuccessExample {Number} 返回成功样例:
 * {
 *     ok : 1
 * }
 */
// 新增 avatar接收前端文件的字段，需和前端保持一致 upload.single('avatar')-单个
router.post('/', upload.array('avatar'), UserController.addUser);


/**
 * 
 * @api {put} /api/users/:id 更新用户
 * @apiName updateUser
 * @apiGroup userGroup
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} id 用户id，必填
 * @apiParam  {String} username 用户名，必填
 * @apiParam  {String} password 密码，必填
 * @apiParam  {Number} age 年龄
 * 
 * 
 * @apiParamExample  {json} Request-Example:
 * {
 *     username: '张三',
 *     password: '123',
 *     age: 12
 * }
 * 
 * @apiSuccess (200) {Number} ok 1
 * 
 * @apiSuccessExample {Number} 返回成功样例:
 * {
 *     ok : 1
 * }
 */
// 更新 updateOne updateMany
router.put('/:id', UserController.updateUser);


/**
 * 
 * @api {delete} /api/users/:id 删除用户
 * @apiName deleteUser
 * @apiGroup userGroup
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} id 用户id，必填
 * 
 * 
 * @apiSuccess (200) {Number} ok 1
 * 
 * @apiSuccessExample {Number} 返回成功样例:
 * {
 *     ok : 1
 * }
 */
// 删除 deleteOne deleteMany 
router.delete('/:id', UserController.deleteUser);

/**
 * 
 * @api {post} /api/login 登录
 * @apiName login
 * @apiGroup userGroup
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} username 用户名，必填
 * @apiParam  {String} password 密码，必填
 * 
 * 
 * @apiParamExample  {json} Request-Example:
 * {
 *     username: '张三',
 *     password: '123'
 * }
 * 
 * @apiSuccess (200) {Number} ok 1
 * 
 * @apiSuccessExample {Number} 返回成功样例:
 * {
 *     ok : 1
 * }
 */
// 登录校验 
router.post('/login', UserController.validateLogin);

// 退出登录
/**
 * 
 * @api {get} /api/logout 退出登录
 * @apiName logout
 * @apiGroup userGroup
 * @apiVersion  1.0.0
 * 
 * 
 * @apiSuccess (200) {Number} ok 1
 * 
 * @apiSuccessExample {Number} 返回成功样例:
 * {
 *     ok : 1
 * }
 */
router.get('/logout', UserController.logout);

module.exports = router;
