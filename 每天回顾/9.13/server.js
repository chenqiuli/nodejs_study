/**
 * nodejs 请求https://m.maoyan.com/ajax/movieOnInfoList?token=&optimus_uuid=5E4BBD80328311EDAAF70532DD25C522F1E1AEB52E894575A42B62DBC4C8515C&optimus_risk_level=71&optimus_code=10 接口，
 * 再转发给前端，http.get
 * 
 */

const http = require('http');
const https = require('https');
const cheerio = require('cheerio');


http.createServer((req, res) => {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8' // post请求不加这一行
  });

  // httpsGet(data => res.end(data)); // 请求get接口
  // httpsPost(data => res.end(data)); // 请求post接口
  httpsGet2(data => res.end(spider(data)));// 请求别人的网页文档，爬虫抓取数据

}).listen(3000);


const httpsGet = (cb) => {
  let data = "";
  https.get("https://m.maoyan.com/ajax/movieOnInfoList?token=&optimus_uuid=5E4BBD80328311EDAAF70532DD25C522F1E1AEB52E894575A42B62DBC4C8515C&optimus_risk_level=71&optimus_code=10", (res) => {
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      // console.log(data);
      cb(data);
    })
  })
}

const httpsPost = (cb) => {
  const options = {
    hostname: 'monitor.maoyan.com',
    port: 443,
    path: '/api/speed',
    method: 'POST',
    headers: {
      'Content-Type': 'x-www-form-urlencoded',
    }
  };

  const postData = "appkey=canary&v=1";
  const req = https.request(options, (res) => {
    let data = "";
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      cb(data);
    })
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(postData);
  req.end();
}

const httpsGet2 = (cb) => {
  let data = "";
  http.get("http://i.meituan.com/", (res) => {
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      cb(data);
    })
  })
}

const spider = (data) => {
  const $ = cheerio.load(data);
  const $categoryList = $('.category-wrap');

  const categoryArr = [];
  $categoryList.each((index, item) => {
    categoryArr.push({
      title: $(item).find('.category-text').text(),
      img: $(item).find('.category-img').attr('src'),
    })
  });
  return JSON.stringify(categoryArr);
}