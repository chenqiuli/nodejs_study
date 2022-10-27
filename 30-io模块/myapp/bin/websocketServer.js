// websocket响应 
const JWT = require("../utils/jwt");

// 使用映射，前后端可根据这个映射判断
const WebSocketType = {
  Error: 0, // 错误
  GroupList: 1, // 显示所有上线的用户列表
  GroupChat: 2,// 群聊
  SingleChat: 3, // 私聊
};
// 发送消息的格式，前后端都按照这种格式发送
function createWebSocket (user, data) {
  return {
    user,
    data
  };
}
// 封装 广播消息给所有客户端
function sendAll (io) {
  // console.log(Array.from(io.sockets.sockets).map(item => item[1].user));// 内含每个客户端的信息
  const userList = Array.from(io.sockets.sockets).map(item => item[1].user);
  io.sockets.emit(WebSocketType.GroupList, createWebSocket(null, userList));
}

// 当某个客户端连接成功的时候触发
function startWebServer (server) {
  const io = require('socket.io')(server);
  io.on('connection', (socket) => {
    // console.log(socket.handshake.query.token);
    const payload = JWT.verify(socket.handshake.query.token);
    if (payload) {
      // 给客户端传递消息
      socket.user = payload; // 给每个客户端绑上身份
      socket.emit(WebSocketType.GroupChat, createWebSocket(null, "欢迎来到聊天室"));
      sendAll(io);
    } else {
      // 给客户端传递消息
      socket.emit(WebSocketType.Error, createWebSocket(null, "token过期"));
    }

    // 当收到客户端发送的请求用户列表时
    socket.on(WebSocketType.GroupList, () => {
      // 给客户端返回用户列表回去
      sendAll(io);
    });

    // 当收到客户端发送的群聊信息时,msg是客户端的信息
    socket.on(WebSocketType.GroupChat, (msg) => {
      // 把客户端发送过来的消息重新返回给客户端，展示于群聊中
      io.sockets.emit(WebSocketType.GroupChat, createWebSocket(socket.user.username, msg.data));
    });

    // 当收到客户端发送的私聊信息时,msg是客户端的信息
    socket.on(WebSocketType.SingleChat, (msg) => {
      // 把客户端发送过来的消息返回给目标用户，展示于私聊中
      Array.from(io.sockets.sockets).forEach(item => {
        // console.log(item[1], 'item');
        if (item[1].user.username === msg.to) {
          // item[1].emit 发给固定一个接收方的客户端
          item[1].emit(WebSocketType.SingleChat, createWebSocket(socket.user.username, msg.data));
        }
      });
    });
  });

}

module.exports = startWebServer;