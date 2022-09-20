/**
 * Hmac加密:有秘钥
 */
const crypto = require('crypto');
const Hmac = crypto.createHmac('sha256', 'a secret key');

Hmac.update('qiuli');

console.log(Hmac.digest('hex'));