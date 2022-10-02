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
      res.send({ ok: 1 });
    } else {
      res.send({ ok: 0 });
    }
  },
}

module.exports = UserController;


