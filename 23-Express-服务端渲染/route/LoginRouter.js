// 路由级中间件
const express = require('express');
const route = express.Router();

route.get("/", (req, res) => {
  res.render("login", { data: '' }); // 使用模板引擎 第二个参数是给模板引擎传值，模板页面使用<%=data%>接收
});

route.post("/", (req, res) => {
  const { username, password } = req.body;
  if (username === 'qiuli' && password === '123') {
    const data = [{
      id: 1,
      title: '标题一',
    }, {
      id: 2,
      title: '标题二',
    }, {
      id: 3,
      title: '标题三',
    }];
    const html = '<div style="color: red;">111</div>';
    res.render("home", { data, html, isShow: true, });
  } else {
    res.render("login", { data: "用户名密码不匹配" });
  }
});


module.exports = route;


/**
 * res.send
 * res.json
 * res.render
 * res.redirect
 * 
 * static 静态资源文件夹 
 * views 模板引擎文件夹 服务端渲染
 * 
 * ejs模板引擎文件语法
 */