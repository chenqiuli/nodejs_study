/** 
 * querystring - Legacy 旧版
 * 新版使用url模块的URLSearchParams替代
 */

const querystring = require('querystring');

const str1 = 'name=home&age=100';
const obj1 = querystring.parse(str1);
console.log(obj1); // 转成json

const obj2 = {
  a: 1,
  b: 2
}

const str2 = querystring.stringify(obj2);
console.log(str2); // 转成字符串 

const str3 = 'http://localhost:3000/api/list?name=home&age=100';
const newStr3 = querystring.escape(str3); // 对字符串的特殊字符做转义
console.log(newStr3);

const str4 = "http%3A%2F%2Flocalhost%3A3000%2Fapi%2Flist%3Fname%3Dhome%26age%3D100";
const newStr4 = querystring.unescape(str4); // 把转义字符转回来
console.log(newStr4);

/**
 * 新版使用url模块的URLSearchParams类
 */
const { URL } = require('url');

// url字符串转json
const myURL = new URL('http://127.0.0.1:3000?name=home&age=100');
console.log(myURL);
const queryObj = myURL.searchParams;
console.log(queryObj); // { 'name' => 'home', 'age' => '100' }

const newQueryObj = {};
queryObj.forEach((value, key) => {
  console.log(value, key);
  newQueryObj[key] = value;
});

console.log(newQueryObj); // { name: 'home', age: '100' }

// json转url字符串，如果带中文，可用decodeURI解码，对应的可用encodeURI转码
const obj3 = {
  name: '小秋',
  age: 18,
}
const newObj3 = new URLSearchParams(obj3);
console.log(decodeURI(newObj3.toString()));



const str5 = 'http://localhost:3000/api/list?name=home&age=100';
const newStr5 = encodeURIComponent(str5); // 对字符串的特殊字符做转义
console.log(newStr5);

const str6 = "http%3A%2F%2Flocalhost%3A3000%2Fapi%2Flist%3Fname%3Dhome%26age%3D100";
const newStr6 = decodeURIComponent(str6); // 把转义字符转回来
console.log(newStr6);