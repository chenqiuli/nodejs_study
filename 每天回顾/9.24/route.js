const { obj, render } = require("./utils");
const path = require('path');
const fs = require('fs');
const mime = require('mime');

const route = {
  '/': (req, res) => {
    render({
      ...obj,
      data: './static/home.html'
    }, res);
  },
  '/home': (req, res) => {
    render({
      ...obj,
      data: './static/home.html'
    }, res);
  },
  '/login': (req, res) => {
    render({
      ...obj,
      data: './static/login.html'
    }, res);
  },
  '/404': (req, res) => {
    const pathname = path.join(__dirname, '/static', req.url);
    // console.log(pathname, 'pathname');
    if (fs.existsSync(pathname)) {
      render({
        ...obj,
        status: 200,
        type: mime.getType(req.url.split('.')[1]),
        data: pathname
      }, res);
    } else {
      render({
        ...obj,
        status: 404,
        data: './static/404.html'
      }, res);
    }
  },
}

module.exports = route;