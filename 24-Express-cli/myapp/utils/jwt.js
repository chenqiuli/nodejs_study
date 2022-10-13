const jwt = require('jsonwebtoken');
const secret = 'anydata';  // 秘钥


const JWT = {
  generate: (payload) => {
    // console.log(payload, expiresIn, 'expiresIn');
    // 签名  加密数据,秘钥,options其他选项 payload是个对象
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  },
  verify: (token) => {
    // 解密  token,秘钥
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return false
    }
  }
}

module.exports = JWT;

/**
 * var JWT = require("../utils/jwt");
  const token = JWT.generate({ name: 'qiuli' });
  console.log(token);
  const data = JWT.verify(token);
  console.log(data);
  setTimeout(() => {
    const data = JWT.verify(token);
    console.log(data);
  }, 11000);
 */