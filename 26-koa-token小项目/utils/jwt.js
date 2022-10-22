const jwt = require('jsonwebtoken');
const secret = 'anydata';  // 秘钥


const JWT = {
  generate: (payload, expiresIn) => {
    // 签名  加密数据,秘钥,options其他选项 payload是个对象,expiresIn过期时间
    return jwt.sign(payload, secret, { expiresIn });
  },
  verify: (token) => {
    // 解密  token,秘钥
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return false;
    }
  }
};

module.exports = JWT;