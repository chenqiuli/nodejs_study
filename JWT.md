### JWT 登录鉴权

![cookie+session设计草图](./assets/cookie%2Bsession.png)

##### json web token - 只能用于 ajax 请求接口的拦截

```bash
1.客户端登录完成，服务器返回token至返回头
2.客户端成功请求之前，把token存放至localStorage中
3.客户端发起请求之前，都要把token带上请求头
4.服务器统一处理响应所有接口，拿到token，使用之前的秘钥对比有没有被篡改，token有效返回接口数据，失效返回401，token只能用于前后端交互时使用，后端返回路由页面不可用
5.客户端取到数据，若401统一处理跳转登录页，若成功进入页面则再次把token存至localStorage中
```

```bash
npm i jsonwebtoken -S
```

```js
// 封装的JWT校验和生成token方法
const jwt = require('jsonwebtoken');
const secret = 'anydata'; // 秘钥

const JWT = {
  generate: (payload, expiresTime) => {
    // console.log(payload, expiresIn, 'expiresIn');
    // 签名  加密数据,秘钥,options其他选项 payload是个对象
    return jwt.sign(payload, secret, { expiresIn: expiresTime });
  },
  verify: (token) => {
    // 解密  token,秘钥
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return false;
    }
  },
};

module.exports = JWT;

/**
 * 使用：
 * var JWT = require("../utils/jwt");
  const token = JWT.generate({ name: 'qiuli' },'1h');
  console.log(token);
  const data = JWT.verify(token);
  console.log(data);
  setTimeout(() => {
    const data = JWT.verify(token);
    console.log(data);
  }, 11000);
 */
```
