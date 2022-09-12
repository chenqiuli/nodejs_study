
const renderHtml = (url) => {
  let res;
  switch (url) {
    case '/home':
      res = '<p>home页面</p>';
      break;
    case '/api/home':
      res = JSON.stringify(['home1', 'home2']);
      break;
    case '/list':
      res = '<p>list页面</p>';
      break;
    case '/api/list':
      res = JSON.stringify({
        name: 'list'
      });
      break;
    default:
      res = '<p>404 not found</p>';
  }
  return res;
}

module.exports = renderHtml;