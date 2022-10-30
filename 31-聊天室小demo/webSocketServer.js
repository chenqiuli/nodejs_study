const JWT = require("./utils/jwt");
const conn = require("./config/db.config");

const webSocketType = {
  Error: 0,
  GroupChat: 1, // 群聊
  GroupList: 2, // 用户列表
  SingleChat: 3,// 私聊
  ChatList: 4, // 聊天记录
};

function createWebSocketInfo (user, data, avatar, sendTime) {
  return {
    user,
    data,
    avatar,
    sendTime
  };
}

// 发送用户列表
function sendAllList (io) {
  const userList = Array.from(io.sockets.sockets).map(item => item[1].user);
  io.sockets.emit(webSocketType.GroupList, createWebSocketInfo(null, userList));
}

let allData = [];

function createWebSocketServer (server) {
  const socketio = require("socket.io");
  const io = socketio(server);
  io.on('connection', async (socket) => {
    const payload = JWT.verify(socket.handshake.query.token);
    if (payload) {
      socket.user = payload;
      sendAllList(io);
      // 发送聊天记录
      socket.emit(webSocketType.ChatList, createWebSocketInfo(null, allData));
    } else {
      socket.emit(webSocketType.Error, createWebSocketInfo(null, 'token失效'));
    }

    socket.on('disconnect', () => {
      sendAllList(io);
      allData = [];
    });

    // 问题一：A和B客户端聊了很久，C上线了，C应该看到的聊天记录，怎么做？
    socket.on(webSocketType.GroupChat, async (msg) => {
      // console.log(msg);
      // 告诉客户端是谁发的消息，以及从数据库中找出发送的这个人的头像
      const connection = await conn();
      const [rows] = await connection.execute("select avatar from student where name = ?", [socket.user.username]);
      io.sockets.emit(webSocketType.GroupChat, createWebSocketInfo(socket.user.username, msg.data, rows[0].avatar, msg.sendTime));
      // 保存所有的聊天记录
      allData.push(createWebSocketInfo(socket.user.username, msg.data, rows[0].avatar, msg.sendTime));
    });
  });
}

module.exports = createWebSocketServer;