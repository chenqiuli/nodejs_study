// websocket响应 
const WebSocket = require("ws");
const WebSocketServer = WebSocket.WebSocketServer;

const wss = new WebSocketServer({ port: 8088 });

const JWT = require("../utils/jwt");

// 使用映射，前后端可根据这个映射判断
const WebSocketType = {
  Error: 0, // 错误
  GroupList: 1, // 显示所有上线的用户列表
  GroupChat: 2,// 群聊
  SingleChat: 3, // 私聊
};
// 发送消息的格式，前后端都按照这种格式发送
function createWebSocket (type, user, data) {
  return JSON.stringify({
    type,
    user,
    data
  });
}
// 封装 广播消息给所有客户端
function sendAll () {
  // console.log(Array.from(wss.clients), 'wss.clients'); // 内含每个客户端的信息
  const userList = Array.from(wss.clients).map(item => item.user);
  return wss.clients.forEach(function each (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(createWebSocket(WebSocketType.GroupList, null, userList));
    }
  });
}

// 当某个客户端连接成功的时候触发
wss.on('connection', function connection (ws, req) {
  const url = new URL(req.url, "ws://localhost:8080/");  // 获取token
  const payload = JWT.verify(url.searchParams.get("token")); // 校验token
  if (payload) {
    // 发送连接成功的消息给客户端 ws.send(xxx) xxx只能是字符串
    ws.send(createWebSocket(WebSocketType.GroupChat, null, '欢迎来到聊天室'));
    ws.user = payload; // 绑定当前的连接客户端名字
    sendAll();
  } else {
    ws.send(createWebSocket(WebSocketType.Error, null, 'token失效'));
  }

  // 当收到某个客户端的信息的时候触发，data-客户端发送的消息
  ws.on('message', function message (data) {
    const info = JSON.parse(data);
    switch (info.type) {
      case WebSocketType.GroupList:
        sendAll();
        break;
      case WebSocketType.GroupChat:
        wss.clients.forEach(function each (client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(createWebSocket(WebSocketType.GroupChat, ws.user.username, info.data));
          }
        });
        break;
      case WebSocketType.SingleChat:
        wss.clients.forEach(function each (client) {
          // console.log(client.user.username, info.to, info.data);
          // 当某一个连接的客户端跟接收方是同一个账号并且客户端状态为打开的情况下
          if (client.user.username === info.to && client.readyState === WebSocket.OPEN) {
            client.send(createWebSocket(WebSocketType.SingleChat, ws.user.username, info.data));
          }
        });
        break;
      default:
        break;
    }
  });

  // 当某个客户端关闭的时候触发
  ws.on("close", function close () {
    sendAll();
  });
});