# 一、websocket 介绍

## 是 html5 新增的协议，基于 http 连接来建议的协议，客户端与服务器可以长连接，实时更新

<hr/>

# 二、socket 编程流程：

## 1.从浏览器发起一个请求，是一个标准的 HTTP 请求

## 2.服务器发给客户端的状态码是 101，返回文本数据或二进制数据

![socket请求](./assets/socket%E8%AF%B7%E6%B1%82.PNG)

```bash
npm i ws -S
```

## 建立 socket 连接，带上 token，后端验证

<hr />

# 三、基于 http 的长连接的方式

## 1.轮询：写一段 js 的定时器，定时发送 缺点：服务器受不了这个压力，不够实时性

## 2.服务器推模式：

<hr />

# 四、socket.io 模块

## 优雅降级，不支持 websocket 的浏览器可以优雅降级为长轮询实现推模式

## io.on 可以自定义很多事件，

## 热更新，开发效率高，开发成本低

## 前端调用 socket.io 的接口是要引入 io.js 的脚本

## 与 express 共用 3000 端口号

## socket.handshake 获取前端的参数 socket.handshake.query.token

## socket.emit("aaa","111") 前后端均可 发布 aaa 事件，传递 111

## socket.on("aaa",(msg) => console/log(msg)) 前后端均可 订阅 aaa 事件，接收 111

## emit 一方发布 on 另一方订阅

## 当前连接的用户：socket.user

## 所有连接的用户：io.sockets.sockets 上有所有用户

## io.sockets.emit：给所有用户发送消息包括自己，群发

## socket.broadcast.emit：发给除了自己的所有用户

```bash
npm i socket.io -S
```

```js
// websocket响应
const JWT = require('../utils/jwt');

// 使用映射，前后端可根据这个映射判断
const WebSocketType = {
  Error: 0, // 错误
  GroupList: 1, // 显示所有上线的用户列表
  GroupChat: 2, // 群聊
  SingleChat: 3, // 私聊
};
// 发送消息的格式，前后端都按照这种格式发送
function createWebSocket(user, data) {
  return {
    user,
    data,
  };
}
// 封装 广播消息给所有客户端
function sendAll(io) {
  // console.log(Array.from(io.sockets.sockets).map(item => item[1].user));// 内含每个客户端的信息
  const userList = Array.from(io.sockets.sockets).map((item) => item[1].user);
  io.sockets.emit(WebSocketType.GroupList, createWebSocket(null, userList));
}

// 当某个客户端连接成功的时候触发
function startWebServer(server) {
  const io = require('socket.io')(server);
  io.on('connection', (socket) => {
    // console.log(socket.handshake.query.token); // 获取前端的参数都在socket.handshake中
    const payload = JWT.verify(socket.handshake.query.token);
    if (payload) {
      // 给客户端传递消息
      socket.user = payload; // 给每个客户端绑上身份
      socket.emit(
        WebSocketType.GroupChat,
        createWebSocket(null, '欢迎来到聊天室')
      );
      sendAll(io);
    } else {
      // 给客户端传递消息
      socket.emit(WebSocketType.Error, createWebSocket(null, 'token过期'));
    }

    socket.on('disconnect', () => {
      // 断开连接时
      sendAll(io);
    });

    // 当收到客户端发送的请求用户列表时
    socket.on(WebSocketType.GroupList, () => {
      // 给客户端返回用户列表回去
      sendAll(io);
    });

    // 当收到客户端发送的群聊信息时,msg是客户端的信息
    socket.on(WebSocketType.GroupChat, (msg) => {
      // 把客户端发送过来的消息重新返回给客户端，展示于群聊中
      io.sockets.emit(
        WebSocketType.GroupChat,
        createWebSocket(socket.user.username, msg.data)
      );
    });

    // 当收到客户端发送的私聊信息时,msg是客户端的信息
    socket.on(WebSocketType.SingleChat, (msg) => {
      // 把客户端发送过来的消息返回给目标用户，展示于私聊中
      Array.from(io.sockets.sockets).forEach((item) => {
        // console.log(item[1], 'item');
        if (item[1].user.username === msg.to) {
          // item[1].emit 发给固定一个接收方的客户端
          item[1].emit(
            WebSocketType.SingleChat,
            createWebSocket(socket.user.username, msg.data)
          );
        }
      });
    });
  });
}

module.exports = startWebServer;
```

```js
// express中使用
const webSocket = require('./websocketServer'); // 引入socket服务器
var server = http.createServer(app);
webSocket(server);

// koa中使用
const Koa = require('koa');
const app = new Koa();
const http = require('http');
const server = http.createServer(app.callback()); // server结合了koa的端口和webSocket的端口
const webSocketServer = require('./webSocketServer');
webSocketServer(server);
// 这里很关键，两个整合了使用同一个端口
server.listen(3000, () => {
  console.log('server start');
});
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= title%></title>
    <script src="/javascripts/socketio.js"></script>
  </head>
  <body>
    <h1><%= title%></h1>
    <h1 id="username"></h1>
    <input type="text" id="text" />
    <input type="button" id="send" value="发送" />
    <select id="select">
      <!-- <option value="volvo">Volvo</option>
      <option value="audi">Audi</option> -->
    </select>
    <!-- 1.建立socket连接，带着token去，后端验证token，失效跳转login页，没有失效可以进入聊天室 -->
    <!-- 2.当每一个客户端上线连接时，实时显示所有连接的客户端列表 -->
    <!-- 3.下拉框选择是ALL还是某个用户，判断群聊还是私聊，群聊-所有的客户端都显示信息，私聊-仅接收方收到 -->
  </body>
  <script>
    const WebSocketType = {
      Error: 0, // 错误
      GroupList: 1, // 显示所有上线的用户列表
      GroupChat: 2, // 群聊
      SingleChat: 3, // 私聊
    };
    function createWebSocket(data, to) {
      return {
        data,
        to,
      };
    }

    const select = document.getElementById('select');
    const text = document.getElementById('text');
    const send = document.getElementById('send');
    const username = document.getElementById('username');
    username.innerHTML = localStorage.getItem('username');

    const socket = io(
      `ws://localhost:3000?token=${localStorage.getItem('token')}`
    );

    // 接收服务器的数据
    socket.on(WebSocketType.GroupChat, (msg) => {
      const user = msg.user ? msg.user : '广播';
      console.log(`${user}：${msg.data}`);
    });

    socket.on(WebSocketType.Error, () => {
      localStorage.removeItem('token');
      location.href = '/login';
    });

    socket.on(WebSocketType.GroupList, (msg) => {
      select.innerHTML = '';
      select.innerHTML =
        "<option value='all'>all</option>" +
        msg.data
          .map(
            (item) => `<option value=${item.username}>${item.username}</option>`
          )
          .join('');
    });

    socket.on(WebSocketType.SingleChat, (msg) => {
      console.log(`${msg.user}：${msg.data}`);
    });

    // 发送消息给服务器
    send.onclick = () => {
      if (select.value === 'all') {
        // 群发 发送消息
        socket.emit(WebSocketType.GroupChat, createWebSocket(text.value, null));
      } else {
        // 私聊
        socket.emit(
          WebSocketType.SingleChat,
          createWebSocket(text.value, select.value)
        );
      }
    };
  </script>
</html>
```
