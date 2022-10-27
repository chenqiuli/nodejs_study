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
