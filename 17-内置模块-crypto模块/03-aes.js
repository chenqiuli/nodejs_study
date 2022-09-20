const crypto = require('crypto');

function encrypt (key, iv, data) {
  let dep = crypto.createCipheriv('aes-128-cbc', key, iv);
  return dep.update(data, 'binary', 'base64') + dep.final('base64');
}

function decrypt (key, iv, crypted) {
  crypted = Buffer.from(crypted, 'base64').toString('binary');
  let dep = crypto.createDecipheriv('aes-128-cbc', key, iv);
  return dep.update(crypted, 'binary', 'utf-8') + dep.final('utf-8');
}

let key = '1234567890abcdef';
let iv = 'abcdef1234567890';
let data = 'qiuli';
const crypted = encrypt(key, iv, data);
console.log('加密后的：', crypted);
const decrypted = decrypt(key, iv, crypted);
console.log('解密后的：', decrypted);
