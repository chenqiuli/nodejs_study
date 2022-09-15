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
      events.emit("play", data);
    })
  });
}