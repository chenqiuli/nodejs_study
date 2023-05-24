### GraphQL：用于构建和查询 API 的查询语言和运行时环境

- 1、特点：
  - 只请求需要的数据，不多不少
  - 获取多个资源，只用一个请求
  - restful 一个接口只能返回一个资源，graphql 一次可以获取多个资源
  - restful 用不同的 url 来区分资源，graphql 用类型区分资源
  - 通过使用 GraphQL，客户端可以明确指定需要的数据结构和字段，并从服务器一次性获取所需的数据，而不需要多次请求或从不同端点获取数据

### GraphQL + Express 开发

- 查询 Query

```js
const express = require('express');
const router = express.Router();

const { buildSchema } = require('graphql');
const graphqlHttp = require('express-graphql');

const fakeFilmList = [
  {
    id: 1,
    filmName: '电影一',
    price: 20,
  },
  {
    id: 2,
    filmName: '电影二',
    price: 30,
  },
  {
    id: 3,
    filmName: '电影三',
    price: 30,
  },
];

// 定义Schmea，有哪些可以查询的方法
const Schema = buildSchema(`
  type AccountInfo {
    name: String,
    age: Int,
    location: String
  }

  type Film {
    id: Int,
    filmName: String,
    price: Int
  }


  type Query{
    // 返回基本类型
    hello: String,
    getName: String,
    getAge: Int,
    // 返回数组类型
    getAllNames: [String],
    getAllAges: [Int],
    // 返回对象 
    getAccountInfo: AccountInfo,
    // 返回对象数组
    getFilmList: [Film],
    // 有id入参，id必填
    getFilmDetail(id: Int!): Film
  }
`);
// 处理器：具体实现该查询的方法
const root = {
  hello: () => {
    const str = 'hello world';
    return str;
  },
  getName: () => '陈秋丽',
  getAge: () => 100,
  getAllNames() {
    return ['aaa', 'bbb', 'ccc'];
  },
  getAllAges() {
    return [10, 20, 30];
  },
  getAccountInfo() {
    return {
      name: '老六',
      age: 20,
      location: '广东广州',
    };
  },
  // 列表页，返回所有信息
  getFilmList() {
    return fakeFilmList;
  },
  // 详情页，根据id查询某条信息
  getFilmDetail({ id }) {
    return fakeFilmList.filter((item) => item.id === id)[0];
  },
};

// 注意这里一定要是use，router.use或app.use
router.use(
  '/',
  graphqlHttp({
    schema: Schema,
    rootValue: root,
    graphiql: true,
  })
);

module.exports = router;
```

![](./assets/graphql%E8%B0%83%E8%AF%95%E7%95%8C%E9%9D%A2.jpg)

- 增删改 Mutation

```js
const express = require('express');
const router = express.Router();

const { buildSchema } = require('graphql');
const graphqlHttp = require('express-graphql');

let fakeFilmList = [
  {
    id: 1,
    filmName: '电影一',
    price: 20,
  },
  {
    id: 2,
    filmName: '电影二',
    price: 30,
  },
  {
    id: 3,
    filmName: '电影三',
    price: 30,
  },
];

// 定义Schmea，有哪些可以查询的方法
const Schema = buildSchema(`
  type Film {
    id: Int,
    filmName: String,
    price: Int
  }
  // 增改 的类型一定要是input
  input FilmInput {
    filmName: String,
    price: Int
  }

  type Query{
    getFilmList: [Film],
  }
  
  type Mutation {
    createFilm(input: FilmInput): Film,
    updateFilm(id: Int!, input: FilmInput): Film,
    deleteFilm(id: Int!): Int
  }
`);
// 处理器：具体实现该查询的方法
const root = {
  // 列表页，返回所有信息
  getFilmList() {
    return fakeFilmList;
  },

  createFilm({ input }) {
    const newData = { ...input, id: fakeFilmList.length + 1 };
    fakeFilmList.push(newData);
    return newData;
  },

  updateFilm({ id, input }) {
    // console.log(id, input);
    let current = null;

    fakeFilmList = fakeFilmList.map((item) => {
      if (item.id === id) {
        current = { ...item, ...input };
        return { ...item, ...input };
      }
      return item;
    });

    return current;
  },

  deleteFilm({ id }) {
    fakeFilmList = fakeFilmList.filter((item) => item.id !== id);
    return 1;
  },
};

// 注意这里一定要是use，router.use或app.use
router.use(
  '/',
  graphqlHttp({
    schema: Schema,
    rootValue: root,
    graphiql: true,
  })
);

module.exports = router;
```

![](./assets/graphql%E8%B0%83%E8%AF%95%E7%95%8C%E9%9D%A22.jpg)

- 连接 MongoDB 执行 crud 操作

```js
const express = require('express');
const router = express.Router();

const { buildSchema } = require('graphql');
const graphqlHttp = require('express-graphql');

/**
 * 1. 创建db文件夹： mongod.exe --dbpath = "F:\学习之路\nodejs\32-GraphQL\myapp"
 * 2. 连接数据库服务
 * 3. 定义Schema
 * 4. 使用Schema去操作数据库，返回的是Promise对象，可以链式调用
 * FilmModel.create
 * FilmModel.update
 * FilmModel.delete
 * FilmModel.find
 */

// 2. 连接数据库服务
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/maizuo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// 3. 定义Schema
var FilmModel = mongoose.model(
  'film',
  new mongoose.Schema({
    filmName: String,
    price: Number,
  })
);

// 定义GraphQL的Schmea，有哪些可以查询的方法
const Schema = buildSchema(`
  type Film {
    // 数据库的_id自动对应Film的id
    id: String,
    filmName: String,
    price: Int
  }

  input FilmInput {
    filmName: String,
    price: Int
  }

  type Query {
    getFilmList: [Film],
  }
  
  type Mutation {
    createFilm(input: FilmInput): Film,
    updateFilm(id: String!, input: FilmInput): Film,
    deleteFilm(id: String!): Int
  }
`);
// 处理器：具体实现该查询的方法
const root = {
  // 查
  getFilmList() {
    return FilmModel.find({});
  },
  // 增
  createFilm({ input }) {
    return FilmModel.create({
      ...input,
    });
  },
  // 改
  updateFilm({ id, input }) {
    return FilmModel.updateOne(
      {
        _id: id,
      },
      {
        ...input,
      }
    )
      .then((res) => FilmModel.find({ _id: id }))
      .then((res) => {
        // console.log(res);
        return res[0];
      });
  },
  // 删
  deleteFilm({ id }) {
    return FilmModel.deleteOne({
      _id: id,
    }).then((res) => res.ok);
  },
};

// 注意这里一定要是use，router.use或app.use
router.use(
  '/',
  graphqlHttp({
    schema: Schema,
    rootValue: root,
    graphiql: true,
  })
);

module.exports = router;
```

![](./assets/graphql%E8%B0%83%E8%AF%95%E7%95%8C%E9%9D%A23.jpg)

- 客户端访问 graphql

```js
function add() {
  // 参数变量前面加$，跟后端定义的Schema一样
  // 先在graphql调试器自测
  const query = `
        mutation($input: FilmInput){
            createFilm(input: $input){
              id,
              filmName,
              price
            },
        }
      `;
  fetch('/graphqldb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      // 传递参数
      variables: {
        input: {
          filmName: '我在前台添加的',
          price: 6000,
        },
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}
```

- react 中访问 graphql：代码在 react_study/myapp/14-graphql
