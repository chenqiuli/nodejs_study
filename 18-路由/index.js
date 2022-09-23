const { server, assignRouter } = require('./server');
const { route2 } = require('./route');
const { api } = require('./api');

// 注册路由
assignRouter(route2, api);

// 启动服务器
server();