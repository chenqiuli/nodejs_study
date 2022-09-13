/**
 * 有时候后端给前端返回一个html页面，这个时候通过nodejs可以直接爬虫到整个html页面，在nodejs中间层处理成新的数据返回给前端，通过cheerio第三方这个插件
 * https://github.com/cheeriojs/cheerio/wiki/Chinese-README
 */

const http = require('http');
const cheerio = require('cheerio');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json;chaset=utf-8',
  });
  if (req.url === '/api/list') {
    httpsGet(data => res.end(spider(data)));
  }

}).listen(3000);

function httpsGet (cb) {
  let data = "";
  http.get("http://i.meituan.com/", (res) => {
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      cb(data);
    });
  })
}

function spider (data) {
  const $ = cheerio.load(data); // 在这里的基础上去找
  const $categoryList = $(".category-wrap");

  const categoryArr = [];
  $categoryList.each((index, value) => {
    categoryArr.push({
      title: $(value).find(".category-text").text(),
      imgSrc: $(value).find(".category-img").attr('src'),
    });
  });
  // console.log(categoryArr, 'categoryArr');
  return JSON.stringify(categoryArr);
}