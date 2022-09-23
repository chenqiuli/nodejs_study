/** api接口 */
function render (res, data) {
  // console.log(data);
  res.writeHead(200, {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'OPTIONS, GET, PUT, POST, DELETE',
    'Access-Control-Allow-Headers': 'x-requested-with, accept, origin, content-type',
    'X-Powered-By': '3.2.1',
  });
  res.write(data);
  res.end();
}


/**
 * 获取get请求的参数：myURL.searchParams
 * 获取post请求的参数：需要使用事件监听一段一段接收
 */
const api = {
  '/api/loginGet': (req, res) => {
    const myURL = new URL(req.url, 'http://127.0.0.1:3000/');
    const username = myURL.searchParams.get('username');
    const password = myURL.searchParams.get('password');

    if (username === 'qiuli' && password === '123') {
      render(res, JSON.stringify({ ok: '1' }));
    } else {
      render(res, JSON.stringify({ ok: '0' }));
    }
  },

  '/api/loginPost': (req, res) => {
    let data = "";
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      const postData = JSON.parse(data);
      if (postData.username === 'qiuli' && postData.password === '123') {
        render(res, JSON.stringify({ ok: '1' }));
      } else {
        render(res, JSON.stringify({ ok: '0' }));
      }
    });
  }

}

module.exports = {
  api,
};