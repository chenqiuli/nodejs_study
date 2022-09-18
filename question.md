### 遇到的问题：

#### 问：1、https://dreport.meituan.net<POST method>，这个接口的 Content-Type = 'application/octet-stream'，我们在 node 里面使用 http.request 请求这个接口的数据的时候，body 的传参格式是怎样的？

#### 答：查了百度，问了后端朋友，在 node 里面我们写 Content-Type = 'application/json'，body 传参使用 json 格式即可。
