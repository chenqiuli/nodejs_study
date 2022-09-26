const express = require('express');

const Router = express.Router();

Router.get("/", (req, res) => {
  res.send('login success');
});

Router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (username === 'qiuli' && password === '123') {
    res.send({ message: 'success' });
  } else {
    res.send({ message: 'fail' });
  }
});

module.exports = Router;