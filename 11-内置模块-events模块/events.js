/**
 * events 模块是Node对“订阅/发布”模式的实现，优雅实现异步编程 
 * events.on   --  监听指定事件，并触发回调函数
 * events.emit --  触发事件，参数一是on定义的事件名，其余参数是传给on回调函数的参数 
 */

const EventEmitter = require('events');
const events = new EventEmitter();

events.on("play", () => {
  console.log('事件触发了');
});

events.emit("play");