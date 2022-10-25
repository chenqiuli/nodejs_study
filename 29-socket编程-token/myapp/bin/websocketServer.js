// websocket响应 
const WebSocket = require("ws");
const WebSocketServer = WebSocket.WebSocketServer;

const wss = new WebSocketServer({ port: 8088 });

const JWT = require("../utils/jwt");

// 使用映射，前后端可根据这个映射判断
const WebSocketType = {
  Error: 0, // 错误
  GroupList: 1, // 弹幕
  GroupChat: 2,// 群聊
  SingleChat: 3, // 私聊
};
function createWebSocket (type, user, data) {
  return JSON.stringify({
    type,
    user,
    data
  });
}

wss.on('connection', function connection (ws, req) {
  const url = new URL(req.url, "ws://localhost:8080/");  // 获取token
  const payload = JWT.verify(url.searchParams.get("token"));
  // console.log(payload);
  if (payload) {
    // 发送连接成功的消息给客户端 ws.send(xxx) xxx只能是字符串
    ws.send(createWebSocket(WebSocketType.GroupList, null, '欢迎来到聊天室'));
  } else {
    ws.send(createWebSocket(WebSocketType.Error, null, 'token失效'));
  }

  ws.on('message', function message (data) {
    // 广播消息给所有客户端
    wss.clients.forEach(function each (client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: false });
      }
    });
  });
});