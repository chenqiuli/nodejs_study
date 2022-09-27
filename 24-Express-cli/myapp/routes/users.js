var express = require('express');
var router = express.Router();
const UserModel = require("../model/UserModel");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
  // res.send('respond with a resource');
  const { username, password, age } = req.body;
  // 通过Model定义Entity
  // UserModel.create({
  //   username,
  //   password,
  //   age
  // }).then(data => {
  //   console.log(data);
  //   res.send({ ok: 1 });
  // }).catch(err => {
  //   res.send({ ok: 0 });
  // })
  const UserEntity = new UserModel({
    username,
    password,
    age
  });
  UserEntity.save(err => {
    if (err) {
      res.send({ ok: 0 });
    } else {
      res.send({ ok: 1 });
      // res.render('home');
    }
  });
});

module.exports = router;
