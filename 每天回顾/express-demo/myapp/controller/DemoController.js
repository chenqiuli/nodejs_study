/**
 * MVC
 * M - model - model有了，用services替代，与数据库打交道，
 * V - view - 前端
 * C - Controller - 接收前端参数，传给M层处理，返回结果给前端
 */

const DemoService = require("../services/DemoService");

const DemoController = {
  addUser: async (req, res, next) => {
    const { username, password } = req.body;
    const count = await DemoService.count(username);
    if (count) {
      res.send({ message: '该用户已经存在' });
    } else if (!username.length || !password.length) {
      res.send({ message: '用户名或密码不允许为空' });
    } else {
      await DemoService.addUser(username, password);
      res.send({ message: 'success' });
    }
  },
  delUser: async (req, res, next) => {
    const { id } = req.params;
    await DemoService.delUser(id);
    res.send({ message: 'success' });
  },
  updateUser: async (req, res, next) => {
    const { id } = req.params;
    const { username, password } = req.body;
    await DemoService.updateUser(id, username, password);
    res.send({ message: 'success' });
  },
  selectUser: async (req, res, next) => {
    const data = await DemoService.selectUser();
    res.send({ message: 'success', data });
  },
  validateLogin: async (req, res, next) => {
    const { username, password } = req.body;
    const data = await DemoService.validateLogin(username, password);
    if (data?.length > 0) {
      req.session.username = username; // 设置session对象，默认存在内存中，存在内存中有一个弊端，只有重启服务器才会重新计时
      // 如果用户一直在使用这个系统，不经过登录验证，cookie过期时间永远不会变
      // 服务器一更新，客户端的cookie就会丢失，因为session是存在内存中
      res.send({ ok: 1 });
    } else {
      res.send({ ok: 0 });
    }
  }
}

module.exports = DemoController;

