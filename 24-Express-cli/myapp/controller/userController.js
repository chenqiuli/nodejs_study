/**
 * Controller  只负责处理参数的接收传递给m层，接口的返回给v层
 */
const UserSerive = require("../services/userService");

const UserController = {
  addUser: async (req, res, next) => {
    const { username, password, age } = req.body;
    await UserSerive.addUser(username, password, age);
    res.send({ ok: 1 });
  },

  updateUser: async (req, res, next) => {
    const { id } = req.params;
    const { username, password, age } = req.body;
    await UserSerive.updateUser(id, username, password, age);
    res.send({ ok: 1 });
  },

  deleteUser: async (req, res, next) => {
    const { id } = req.params;
    await UserSerive.deleteUser(id);
    res.send({ ok: 1 });
  },

  selectUser: async (req, res, next) => {
    const { pageNum, pageSize } = req.query;
    const [data, totalCount] = await UserSerive.selectUser(pageNum, pageSize);
    res.send({
      data,
      totalCount
    });
  },

  validateLogin: async (req, res, next) => {
    const { username, password } = req.body;
    const result = await UserSerive.validateLogin(username, password);
    if (result?.length) {
      req.session.user = username; // 设置session对象，默认存在内存中，存在内存中有一个弊端，只有重启服务器才会重新计时
      // 如果用户一直在使用这个系统，不经过登录验证，cookie过期时间永远不会变
      // 服务器一更新，客户端的cookie就会丢失，因为session是存在内存中
      res.send({ ok: 1 });
    } else {
      res.send({ ok: 0 });
    }
  },

  logout: (req, res, next) => {
    // 销毁session
    req.session.destroy(() => {
      res.send({ ok: 1 });
    });
  }
}

module.exports = UserController;


