# Node.js - 既可做服务器（直接返回 html 片段或 json 数据给前端），也可做客户端（作为中间层转发给前端）

## PS：1、前端在浏览器请求服务器，受限于浏览器的同源策略，会有跨域。服务器与服务器之间不存在跨域，所以 Node.js 可以作为中间层去请求别的服务器，拿到数据在自己服务器做聚和，返回给前端。

## 2、利用 nodejs 返回给前端的数据，必须是字符串的，使用 JSON.stringify

<hr/>

### 1.Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

### 2.Node.js 内没有 BOM 和 DOM，没有 window 对象。

### 3.使用模块化开发，就是 CommonJS 规范，模块化开发是 CommonJS 规范 的一小部分。

```bash
CommonJS导出方法：
module.exports = test; // 导出单个方法
module.exports = {  // 一个文件中导出多个方法
  test,
  upper,
}
exports.test = test;
exports.upper = upper;

CommonJS导入方法:
var moduleA = require("./a");
```

### 4.npm 下载第三方包

```bash
npm i md5 --save <==> npm i md5  // dependencies 开发版本
npm i md5 --save-dev  // devDependencies 上线版本
npm uninstall md5 -S
```

### 5.nrm 管理所有镜像包

如果你本机电脑使用的是淘宝源，运行公司的项目需要使用公司的私有源，那么此时你就可以使用 nrm，nrm 是 npm 的镜像源管理工具，然后使用 npm，npm 的源指向 taobao。

```bash
npm i nrm -g
nrm -V
nrm ls
nrm add taobao https://registry.npm.taobao.org/
nrm use taobao
nrm current
```

### 6.yarn

```bash
yarn add md5 -S     =>  npm i md5 -S
yarn remove md5 -S  =>  npm uninstall md5 -S
yarn install        =>  npm install
yarn upgrade        =>  npm update
```

### 7.node 的内置模块

#### (1)、[http 模块](https://nodejs.org/dist/latest-v16.x/docs/api/http.html#httpcreateserveroptions-requestlistener)

##### 7-1.创建服务器，直接转发 html 片段或 json 数据给前端， Content-type = application/json || text/html || text/plain，中文会乱码，添加 Content-type = text/html;charset=utf-8

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'application/json');
  res.write('hello world');
  res.write('你好');
  res.end();
});

server.listen(3000, () => {
  console.log('listen on port 3000');
});
```

##### 7-2.发送 jsonp 接口给前端，返回给前端一个函数

```js
/**
 * 知识回顾：jsonp是什么？jsonp的原理是什么？优缺点是什么
 * jsonp是前端解决跨域方式之一。
 * 原理：利用script标签的scr属性没有跨域限制来实现的，将引用的外部文件的内容当做js代码来执行
 * 步骤：1.前端提前定义好callback函数
 *      2.前端动态创建一个script标签， scr属性指向后端请求路径，在路径后面添加callback参数，插入到body中
 *      3.前端请求后端，后端收到前端的请求，解析callback参数，后端返回给前端一个函数，函数名使用callback名，函数返回的内容需要为json格式
 *      4.前端会自动取到后端返回的数据
 * 优点：兼容性好，在一些老的浏览器也可以执行
 * 缺点：只能进行get请求，因为jsonp是通过请求问号后面的callback。后端传回来的是函数
 */
const http = require('http');
const { URL } = require('url');

http
  .createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1:3000/');
    console.log(url.searchParams.get('callback'));
    const callbackName = url.searchParams.get('callback');
    res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
    const data = `${callbackName} (${JSON.stringify(['1', 2])})`;
    res.end(data);
  })
  .listen(3000);
```

```js
const oscript = document.createElement('script');
oscript.src = 'http://localhost:3000/?callback=jsonpFun';
document.body.appendChild(oscript);

function jsonpFun(params) {
  console.log(params);
}
```

##### 7-3.直接返回 json 数据给前端，加'Access-Control-Allow-Origin': '\*' 解决 cors 跨域

```js
/**
 * 如果我想传一个json格式给前端，此时会遇到跨域
 * 添加 'Access-Control-Allow-Origin': '*' 解决cors跨域
 */

const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    });
    const data = JSON.stringify(['1', 2]);
    res.end(data);
  })
  .listen(3000);
```

```js
fetch('http://localhost:3000/')
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });
```

##### 7-4.作为中间层，请求其他服务器数据，再转发给前端，nodejs 用 get 请求别的服务器接口

```js
/**
 * 假设前端想直接请求美团的数据，肯定遇到跨域，但是前端想要美团的数据怎么办呢？
 * 使用nodejs作为中间层，nodejs请求美团的接口，再聚合转发给前端。
 * nodejs - 服务器<添加cors允许跨域请求头>  美团接口 - 另一台服务器  前端 - 客户端
 * 服务器请求另一台服务器 不会遇到跨域，前端请求nodejs的服务器允许跨域
 */

const http = require('http');
const https = require('https');

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    });
    if (req.url === '/api/list') {
      httpsGetMeituan((data) => res.end(data)); // 异步编程
    }
  })
  .listen(3000);

// 获取美团的数据，接口如果是https类型的，使用https模块；如果是http类型的，使用http模块。
function httpsGetMeituan(cb) {
  let data = '';
  https.get(
    'https://gz.meituan.com/ptapi/getComingFilms?ci=20&limit=10',
    (res) => {
      res.on('data', (chunk) => {
        // 请求得到的数据是数据流的格式
        data += chunk;
        // process.stdout.write(d); // 官网写法
      });

      // 告诉服务器已经发送完毕
      res.on('end', () => {
        cb(data); // 回调
      });
    }
  );
}
```

```js
fetch('http://127.0.0.1:3000/api/list')
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });
```

##### 7-5.作为中间层，请求其他服务器数据，再转发给前端，nodejs 用 post 请求别的服务器接口

| Content-Type          | request body                      |
| --------------------- | --------------------------------- |
| applicaiton-json      | json 格式 （使用 JSON.stringify） |
| x-www-form-urlencoded | 'name=qiuli&age=18'               |

```js
const http = require('http');
const https = require('https');

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
    });

    if (req.url === '/api/list') {
      httpsPost((data) => res.end(data));
    }
  })
  .listen(3000);

function httpsPost(cb) {
  const options = {
    hostname: 'dreport.meituan.net',
    port: '443',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'x-www-form-urlencoded',
    },
  };

  const postData = JSON.stringify([
    {
      category: 'fe_perf_web',
      logs: [{ type: 'browser.pv', value: 1, tags: {}, ts: '1662964164972' }],
      env: {
        token: '59918eb8616ab3217c7eeaf5',
        sdkVersion: '1.1.9',
        sr: '1366x768',
        vp: '1349x150',
        csz: 273,
        ua:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        uuid: '1662952731919',
        url: 'https://gz.meituan.com/',
        region: '',
        operator: '',
        network: '',
        container: '',
        os: '',
        visit_id: 'd2439e96-8f89-40fb-8f54-634c48a00ef3',
        other_uuid: '1ca7cddd257c4c2393f8.1662952717.1.0.0',
      },
    },
  ]);
  // const postData = 'name=qiuli&age=18';
  let data = '';
  const req = https.request(options, (res) => {
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      cb(data);
    });
  });

  // Write data to request body
  req.write(postData);
  req.end();
}
```

```js
fetch('http://127.0.0.1:3000/api/list')
  .then((res) => res.text())
  .then((res) => {
    console.log(res);
  });
```

##### 7-6.作为中间层，爬取一个网页，聚合为数据，使用 cheerio 第三方模块做爬虫

```bash
npm init
npm i cheerio -S
```

```js
/**
 * 有时候后端给前端返回一个html页面，这个时候通过nodejs可以直接爬虫到整个html页面，在nodejs中间层处理成新的数据返回给前端，通过cheerio第三方这个插件
 * https://github.com/cheeriojs/cheerio/wiki/Chinese-README
 */

const http = require('http');
const cheerio = require('cheerio');

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json;chaset=utf-8',
    });
    if (req.url === '/api/list') {
      httpsGet((data) => res.end(spider(data)));
    }
  })
  .listen(3000);

function httpsGet(cb) {
  let data = '';
  http.get('http://i.meituan.com/', (res) => {
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      cb(data);
    });
  });
}

function spider(data) {
  const $ = cheerio.load(data); // 在这里的基础上去找
  const $categoryList = $('.category-wrap');

  const categoryArr = [];
  $categoryList.each((index, value) => {
    categoryArr.push({
      title: $(value).find('.category-text').text(),
      imgSrc: $(value).find('.category-img').attr('src'),
    });
  });
  // console.log(categoryArr, 'categoryArr');
  return JSON.stringify(categoryArr);
}
```

<hr/>

#### (2)、[url 模块](https://nodejs.org/dist/latest-v16.x/docs/api/url.html)

##### 获取浏览器 url 的各种信息：

http://localhost:3000/home?name=home
旧版：通过 url.parse(req.url)解析为一个对象；
新版：通过 URL

| 旧版 | 新版                                               | 获取 pathname           | 获取 query          |
| ---- | -------------------------------------------------- | ----------------------- | ------------------- |
| url  |                                                    | url.parse(url).pathname | url.parse(url,true) |
|      | myURL = new URL(req.url, 'http://127.0.0.1:3000/') | myURL.pathname          | myURL.searchParams  |

```js
const http = require('http');
const { URL } = require('url');

http
  .createServer((req, res) => {
    const myURL = new URL(req.url, 'http://127.0.0.1:3000/');
    // console.log(myURL);// 拼凑url， 转成json
    const pathname = myURL.pathname;
    const searchParams = myURL.searchParams; // searchParams 是一个迭代器，可以进行增删改查+遍历
    console.log(searchParams.get('name'));
    console.log(searchParams.toString());
    // es6方法遍历对象
    for (const [key, value] of searchParams) {
      console.log(key, value);
    }
  })
  .listen(3000, () => {
    console.log('server start');
  });
```

<hr/>

#### (3)、[querystring 模块 - legacy 旧版](https://nodejs.org/dist/latest-v18.x/docs/api/querystring.html) querystring 模块已废弃，实现相同使用 url 的新版写法

| 旧版        | 新版                          | 字符转 json        | json 转字符 | 对特殊字符转义     | 对特殊字符解义     |
| ----------- | ----------------------------- | ------------------ | ----------- | ------------------ | ------------------ |
| querystring |                               | parse()            | stringify() | escape             | unescape           |
|             | url 模块的 URLSearchParams 类 | myURL.searchParams | toString()  | encodeURIComponent | decodeURIComponent |

##### PS：encodeURI 和 encodeURIComponent 的区别：encodeURI 不会对 url 请求的 `: / & ? ` 进行转义，encodeUIRComponent 会对所有字符进行转义。decodeURI 和 decodeURIComponent 同理

```js
// url字符串转json
const { URL } = require('url');
const myURL = new URL('http://127.0.0.1:3000?name=home&age=100');
const queryObj = myURL.searchParams;
console.log(queryObj); // { 'name' => 'home', 'age' => '100' }
const newQueryObj = {};
queryObj.forEach((value, key) => {
  newQueryObj[key] = value;
});
console.log(newQueryObj); // { name: 'home', age: '100' }

// json转url字符串，如果带中文，可用decodeURI解码，对应的可用encodeURI转码
const obj3 = {
  name: '小秋',
  age: 18,
};
const newObj3 = new URLSearchParams(obj3);
console.log(decodeURI(newObj3.toString()));

const str5 = 'http://localhost:3000/api/list?name=home&age=100';
const newStr5 = encodeURIComponent(str5); // 对字符串的特殊字符做转义
console.log(newStr5);

const str6 =
  'http%3A%2F%2Flocalhost%3A3000%2Fapi%2Flist%3Fname%3Dhome%26age%3D100';
const newStr6 = decodeURIComponent(str6); // 把转义字符转回来
console.log(newStr6);
```

### 8.让 node 实时编译的工具

```bash
npm i -g nodemon
nodemon server.js

npm i -g node-dev
node-dev server.js
```
