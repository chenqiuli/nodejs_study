## [Express](https://www.expressjs.com.cn/starter/generator.html)

### 一、基础部分

#### 使用 express 脚手架初始化项目

```bash
npm install -g express-generator
express -h
express --view=ejs myapp
npm i
"scripts": {
  "start": "nodemon ./bin/www"
},
npm start
```

#### 1.res.send()，封装了 res.writeHead，res.write，res.end，可以直接返回数据给前端，也可以自动识别什么格式的数据，不需要提前声明 Content-Type。

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('server start');
});
```

#### 2.路由的路径可以是字符串，字符串匹配，正则表达式，常用的是动态路由：:id

```js
// 路径匹配/detail/xxx ,xxx是任意字符
app.get('/detail/:id', (req, res) => {
  res.send('Hello World');
});

// 路径匹配/detail/xxx/xxx ,xxx是任意字符
app.get('/detail/:id/:id2', (req, res) => {
  // 动态路由参数的获取
  console.log(req.params); // { id: '1', id2: '2' }
  res.send('Hello World');
});
```

#### 3.路由路径后面的回调函数是中间件，可以允许有无数个，上一个中间件调用 next()走到下一个中间件，上一个中间件传值给下一个中间件官方没有给出明确的 api，可以往 res 对象里面赋值。多个中间件可以分别拆出来写

```js
const express = require('express');

const app = express();

// 写法一
app.get(
  '/',
  (req, res, next) => {
    // 验证token是否过期，验证成功才发送数据
    const isVaild = true;
    if (isVaild) {
      res.data = '这是fun1的计算结果';
      next();
    } else {
      res.send('error');
    }
  },
  (req, res) => {
    console.log(res.data); // 获取上一个中间件的传值
    res.send('Hello World');
  }
);

// 写法二，这种写法可以实现复用一些共用方法
const fun1 = (req, res, next) => {
  // 验证token是否过期，验证成功才发送数据
  const isVaild = true;
  if (isVaild) {
    res.data = '这是fun1的计算结果';
    next();
  } else {
    res.send('error');
  }
};

const fun2 = (req, res) => {
  console.log(res.data); // 获取上一个中间件的传值
  res.send('Hello World');
};

app.get('/', [fun1, fun2]);

// 写法三
app.get('/', [fun1], (req, res) => {
  console.log(res.data); // 获取上一个中间件的传值
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('server start');
});
```

### 二、[中间件](http://expressjs.com/en/guide/routing.html#express-router)

#### 1.应用级中间件，注册和使用在 app 上，可以万能匹配，也可以为某个路由特殊匹配

```js
const express = require('express');

const app = express();

// 不会执行app.use(fun1)
app.get('/login', (req, res) => {
  res.send('login');
});

const fun1 = (req, res, next) => {
  const isValid = true;
  if (isValid) {
    console.log('验证token');
    next();
  } else {
    console.log('error');
  }
};

app.use(fun1);

app.get('/home', (req, res) => {
  res.send('home');
});

app.listen(3000);
```

#### 2.路由级中间件

```js
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('home');
});
router.get('/swiper', (req, res) => {
  res.send('home-swiper');
});

module.exports = router;

const router = require('./router/HomeRouter');
app.use('/home', router);
```

#### 3.错误中间件，写在最后面

```js
app.use((req, res) => {
  res.status(404).send('404');
});
```

#### 4.内置中间件

#### 5.第三方中间件

### 三、获取 get 请求及 post 请求的参数

| method | Content-Type                      | 配置参数                                        | 获取方法    |
| ------ | --------------------------------- | ----------------------------------------------- | ----------- |
| get    |                                   | -                                               | req.query() |
| post   | application/json                  | app.use(express.urlencoded({ extended:false })) | req.body()  |
| post   | application/s-www-form-urlencoded | app.use(express.json())                         | req.body()  |

```js
// server.js
const express = require('express');
const LoginRouter = require('./route/LoginRouter');

const app = express();

// express版本在4.0以上
// 解析post请求是application/x-www-form-urlencoded的格式
app.use(express.urlencoded({ extended: false }));
// express版本在4.0以上
// 解析post请求是application/json的格式
app.use(express.json());

app.use('/login', LoginRouter);

app.listen(3000, () => {
  console.log('server start');
});

// LoginRouter.js
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.query); // 获取get请求query参数
  res.send('login success -get');
});

router.post('/', (req, res) => {
  /**
   * 前端请求是key-value pairs的格式：Content-Type = applicaiton/x-www-form-urlencoded
   * undefined
   * 在主应用配置app.use(express.urlencoded({ extended: false }))
   * 成功获取
   */
  /**
   * 前端请求是key-value pairs的格式：Content-Type = applicaiton/json
   * {}
   * 在主应用配置app.use(express.json())
   * 成功获取
   */
  console.log(req.body);
  res.send({
    code: 200,
    message: 'success',
  });
});

module.exports = router;
```

### 四、静态资源的配置

```bash
app.use(express.static('static'));
```

### 五、模板引擎的配置

```bash
app.set('views', 'views'); // 模板引擎默认使用文件夹
app.set('view engine', 'ejs'); // 注册ejs模板，默认加载引擎模板的文件夹是views
```

### 六、客户端渲染与服务端渲染

#### 客户端渲染：前后端分离，不利于搜索引擎

#### 服务端渲染：前后不分离，利于搜索引擎。前端写好静态页面，页面中用假数据，后端开发好接口，取前端的静态页面，使用模板引擎把真实数据替换假数据。

### 七、express

```js
app.use(express.static('static')); // 注册静态资源,static路径无需输入
app.use(express.static('public'));
app.use('public', express.static('public')); // 注册静态资源.public路径需要输入
```

```js
app.set('views', 'views'); // 模板引擎默认使用文件夹
app.set('view engine', 'ejs'); // 注册ejs模板，默认加载引擎模板的文件夹是views

const data = [
  {
    id: 1,
    title: '标题一',
  },
  {
    id: 2,
    title: '标题二',
  },
  {
    id: 3,
    title: '标题三',
  },
];
const html = '<div style="color: red;">111</div>';
res.render('home', { data, html, isShow: true }); // 使用模板引擎 第二个参数是给模板引擎传值，模板页面使用<%=data%>接收
```

```ejs
    <%# ejs语法%>
    <%# 引入外部文件%>
    <%-include("header.ejs")%>
     <%# 条件语句或循环语句%>
    <% data.map(item => { %>
      <div><%=item.id+'  '+item.title%></div>
    <% }) %>
    <%# 执行html片段%>
    <%-html%>
    <%# 执行变量，内可直接写三元表达式%>
    <div><%=isShow?'你好':''%></div>
```

```js
// 解析post请求
app.use(express.urlencoded({ extended: false })); // applicaiton/x-www-from-urlencoded
app.use(express.json()); // application/json
```

| res.send | res.render   | res.cookie  |
| -------- | ------------ | ----------- |
| 发送数据 | 发送模板引擎 | 设置 cookie |

### 八、第三方插件

```markdown
# mongoose：连接 mongodb

# express-session：生成 sessionid，自动存到客户端

# connect-mongo：把 session 存到数据库

# jsonwebtoken：生成 token

# multer：客户端文件上传，接收文件
```

### 九、文件上传

#### 1.前端使用 form 表单提交的方式来提交数据，前端需要在 form 表单写明 action，method，每个 input 控件需要注明 name 值，如果含有文件上传的控件，需要在 form 元素上添加 enctype="multipart/form-data"。服务器使用 multer 模块来处理 multipart/form-data 类型的表单数据

```html
<div>1、form表单提交文件的格式</div>
<form action="/api/users" method="post" enctype="multipart/form-data">
  <div>用户名<input type="text" name="username" /></div>
  <div>密码<input type="password" name="password" /></div>
  <div>年龄<input type="text" name="age" /></div>
  <div>头像<input type="file" name="avatar" /></div>
  <div><input type="submit" value="提交" /></div>
</form>
```

```js
// 2、ajax提交文件的格式
register.onclick = () => {
  // 上传文件
  let forms = new FormData();
  forms.append('username', username.value);
  forms.append('password', password.value);
  forms.append('age', age.value);
  // forms.append('avatar', avatar.files[0]); 上传单个

  console.log(Array.from(avatar.files));
  // 上传多个
  Array.from(avatar.files).forEach((item) => {
    forms.append('avatar', item);
  });

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  axios.post('/api/users', forms, config).then((res) => {
    console.log(res.data);
  });
};
```

```js
var multer = require('multer');
const upload = multer({ dest: 'public/images' }); // 存放图片资源的磁盘目录
// 新增 avatar接收前端文件的字段，需和前端保持一致 upload.single('avatar')-单个
router.post('/', upload.array('avatar'), UserController.addUser);

const UserController = {
  addUser: async (req, res, next) => {
    // console.log(req.files, 'req');
    const { username, password, age } = req.body;
    // 单个
    // const avatar = req.file ? `/images/${req.file.filename}` : '/images/quesheng.jpg';
    // 多个，存到数据库存字符串
    const avatar = [];
    req.files?.forEach((item) => {
      avatar.push(`/images/${item.filename}`);
    });
    await UserSerive.addUser(
      username,
      password,
      age,
      avatar?.length ? avatar.join(',') : '/images/quesheng.jpg'
    );
    res.send({ ok: 1 });
  },
};
```

# 十、生成 api 接口文档

```bash
npm i -g apidoc
apidoc -i .\routes -o .\doc
```
