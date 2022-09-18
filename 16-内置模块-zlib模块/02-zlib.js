const http = require('http');
const EventEmitter = require('events');
const fs = require('fs');
const fs_promises = require('fs').promises;
const zlib = require('zlib');
const gzip = zlib.createGzip();

let events = null;

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json;charset=utf-8;',
    'Content-Encoding': 'gzip',
  });

  events = new EventEmitter();
  events.on('play', (data) => {
    fs_promises.writeFile('./demo.html', data).then(() => {
      const rs = fs.createReadStream('./demo.html');
      rs.pipe(gzip).pipe(res);
    });
  });
  httpGet();
}).listen(3000);


function httpGet () {
  let data = '';
  http.get("http://i.meituan.com/", (res) => {
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      events.emit('play', data);
    });
  })
}