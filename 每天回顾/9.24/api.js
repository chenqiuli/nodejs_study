const { obj, render } = require("./utils");

function checkMessage (username, password, res) {
  if (username === 'qiuli' && password === '123') {
    render({
      ...obj,
      type: 'application/json',
      data: JSON.stringify({
        message: 'success'
      })
    }, res);
  } else {
    render({
      ...obj,
      type: 'application/json',
      data: JSON.stringify({
        message: 'fail'
      })
    }, res);
  }
}

const api = {
  '/api/getLogin': (req, res) => {
    const myURL = new URL(req.url, 'http://127.0.0.1:3000/');
    const username = myURL.searchParams.get('username');
    const password = myURL.searchParams.get('password');
    checkMessage(username, password, res);
  },

  '/api/postLogin': (req, res) => {
    let data = "";
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      // console.log(data);
      const { username, password } = JSON.parse(data);
      checkMessage(username, password, res);
    });
  }
}

module.exports = api;