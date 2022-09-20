const http = require('http');
const https = require('https');
const EventEmitter = require('events');

let events = null;

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  if (req.url === '/api/aaa') {
    events = new EventEmitter();
    // 订阅，回调接收发布传过来的参数
    events.on("play", (data) => {
      res.end(data);
    });
    httpsGet();
  }
}).listen(3000);

function httpsGet () {
  let data = "";
  https.get("https://gz.meituan.com/ptapi/getComingFilms?ci=20&limit=10", (res) => {
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      // 发布，第二个参数是传给订阅的参数
      events.emit("play", data);
    })
  });
}