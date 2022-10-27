// axios拦截器
// Add a request interceptor  请求拦截器
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log('发起请求之前，都会执行的');
    // console.log(config);
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    console.log('请求错误，一般去到错误边界');
    return Promise.reject(error);
  }
);

// Add a response interceptor  响应拦截器
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('成功响应后，执行的第一步');
    // console.log(response);
    // 把token存至localStorage
    const { authorization } = response.headers;
    authorization && localStorage.setItem('token', authorization);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log('请求不是200开头的，失败后执行的第一步');
    // console.log(error);
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      location.href = '/login';
    }
    return Promise.reject(error);
  }
);