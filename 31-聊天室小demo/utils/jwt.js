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