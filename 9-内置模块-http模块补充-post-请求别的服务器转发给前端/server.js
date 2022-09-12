const http = require('http');
const https = require('https');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
  });

  if (req.url === '/api/list') {
    httpsPost(data => res.end(data));
  }
}).listen(3000);


function httpsPost (cb) {
  const options = {
    hostname: 'dreport.meituan.net',
    port: '443',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'x-www-form-urlencoded',
    }
  };

  const postData = JSON.stringify([{ "category": "fe_perf_web", "logs": [{ "type": "browser.pv", "value": 1, "tags": {}, "ts": "1662964164972" }, { "type": "page.redirect", "value": 2, "tags": {}, "ts": 1662964152707 }, { "type": "page.dns", "value": 0, "tags": {}, "ts": 1662964152745 }, { "type": "page.connect", "value": 122, "tags": {}, "ts": 1662964152867 }, { "type": "page.network", "value": 162, "tags": {}, "ts": 1662964152867 }, { "type": "page.send", "value": 144, "tags": {}, "ts": 1662964153011 }, { "type": "page.receive", "value": 128, "tags": {}, "ts": 1662964153139 }, { "type": "page.backend", "value": 272, "tags": {}, "ts": 1662964153139 }, { "type": "page.render", "value": 6, "tags": {}, "ts": 1662964164855 }, { "type": "page.dom", "value": 11828, "tags": {}, "ts": 1662964164849 }, { "type": "page.frontend", "value": 11834, "tags": {}, "ts": 1662964164855 }, { "type": "page.load", "value": 12150, "tags": {}, "ts": 1662964164855 }, { "type": "page.domReady", "value": 1057, "tags": {}, "ts": 1662964153762 }, { "type": "page.interactive", "value": 1005, "tags": {}, "ts": 1662964153710 }, { "type": "page.ttf", "value": 2, "tags": {}, "ts": 1662964152707 }, { "type": "page.ttr", "value": 162, "tags": {}, "ts": 1662964152867 }, { "type": "page.ttdns", "value": 40, "tags": {}, "ts": 1662964152745 }, { "type": "page.ttconnect", "value": 40, "tags": {}, "ts": 1662964152745 }, { "type": "page.ttfb", "value": 306, "tags": {}, "ts": 1662964153011 }, { "type": "page.firstPaint", "value": 636.1000000238419, "tags": {}, "ts": "1662964164973" }, { "ts": "1662964164973", "type": "browser.ajax.responseTime", "value": "335", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.requestSize", "value": "1011", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.responseSize", "value": "35", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.responseTime", "value": "627", "tags": { "url": "//portal-portm.meituan.com/horn/v1/modules/lx-web-config/prod", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.requestSize", "value": "23", "tags": { "url": "//portal-portm.meituan.com/horn/v1/modules/lx-web-config/prod", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.responseSize", "value": "93", "tags": { "url": "//portal-portm.meituan.com/horn/v1/modules/lx-web-config/prod", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.responseTime", "value": "536", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.requestSize", "value": "1009", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.responseSize", "value": "35", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.responseTime", "value": "569", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.requestSize", "value": "1009", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.responseSize", "value": "35", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.responseTime", "value": "551", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.requestSize", "value": "1011", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.responseSize", "value": "35", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.responseTime", "value": "551", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.requestSize", "value": "1011", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }, { "ts": "1662964164973", "type": "browser.ajax.responseSize", "value": "35", "tags": { "url": "https://lx1.meituan.net/", "method": "GET" } }], "env": { "token": "59918eb8616ab3217c7eeaf5", "sdkVersion": "1.1.9", "sr": "1366x768", "vp": "1349x150", "csz": 273, "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36", "uuid": "1662952731919", "url": "https://gz.meituan.com/", "region": "", "operator": "", "network": "", "container": "", "os": "", "visit_id": "d2439e96-8f89-40fb-8f54-634c48a00ef3", "other_uuid": "1ca7cddd257c4c2393f8.1662952717.1.0.0" } }]);
  // const postData = 'name=qiuli&age=18';
  let data = '';
  const req = https.request(options, (res) => {
    res.on('data', (chunk) => {
      // console.log(`BODY: ${chunk}`); 
      data += chunk;
    });
    res.on('end', () => {
      cb(data);
    });
  });

  // Write data to request body
  req.write(postData);
  req.end();
}