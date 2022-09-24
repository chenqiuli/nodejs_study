const fs = require('fs');

const obj = {
  status: 200,
  type: 'text/html',
  data: '',
}


function render ({ status, type, data }, res) {
  res.writeHead(status, {
    'Content-Type': `${type};charset=utf-8`,
    // 'Access-Control-Allow-Origin': '*'
  });
  data = data?.includes("static") ? fs.readFileSync(data) : data;
  res.end(data);
}


module.exports = {
  obj,
  render
}