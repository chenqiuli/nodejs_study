const DemoModel = require("../model/DemoModel");

const DemoService = {
  count: (username) => {
    return DemoModel.countDocuments({ username });
  },
  addUser: (username, password) => {
    return DemoModel.create({
      username,
      password
    });
  },
  delUser: (_id) => {
    return DemoModel.deleteOne({ _id });
  },
  updateUser: (_id, username, password) => {
    return DemoModel.updateOne({ _id }, { username, password });
  },
  selectUser: () => {
    return DemoModel.find({});
  },
  validateLogin: (username, password) => {
    return DemoModel.find({ username, password });
  }
}

module.exports = DemoService;