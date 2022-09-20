/**
 * md5加密
 * sha256 sha512加密
 */

const crypto = require('crypto');
const hase = crypto.createHash('sha256');

hase.update('qiuli');

console.log(hase.digest('hex'));