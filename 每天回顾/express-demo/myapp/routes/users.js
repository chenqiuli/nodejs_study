var express = require('express');
var router = express.Router();
const DemoController = require("../controller/DemoController");


/* 添加用户接口 */
router.post('/', DemoController.addUser);

/* 删除用户接口 */
router.delete('/:id', DemoController.delUser);

/* 更新用户接口 */
router.put('/:id', DemoController.updateUser);

/* 查询用户接口 */
router.get('/', DemoController.selectUser);

/* 登录验证接口 */
router.post('/login', DemoController.validateLogin);

module.exports = router;
