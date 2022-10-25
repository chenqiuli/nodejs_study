const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/chat", (req, res, next) => {
  res.send({ ok: 1 });
});

app.listen(3000, () => {
  console.log('server start');
});


// websocket响应 
const WebSocket = require("ws");
const WebSocketServer = WebSocket.WebSocketServer;

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection (ws) { // ws-当前发送消息的客户端
  // 在收到客户端发送消息的时候
  ws.on('message', function message (data) {
    // 接收客户端的响应
    // console.log('received: %s', data);


    // 广播消息给客户端
    // wss.clients-所有连接的客户端  
    wss.clients.forEach(function each (client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: false });
      }
    });
  });

  // 发送连接成功的消息给客户端
  ws.send('哈哈哈');
});