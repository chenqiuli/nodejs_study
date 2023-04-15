function renderStatus (url) {
  const routeList = ['/home', '/list', '/api/home', '/api/list'];
  return routeList.includes(url) ? 200 : 404;
}

exports.renderStatus = renderStatus;