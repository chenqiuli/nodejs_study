const mongoose = require("mongoose");
const DemoSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const DemoModel = mongoose.model('demo', DemoSchema);
module.exports = DemoModel;