const express = require("express");
const router = express.Router();

const { buildSchema } = require("graphql");
const graphqlHttp = require("express-graphql");

const fakeFilmList = [{
  id: 1,
  filmName: "电影一",
  price: 20
}, {
  id: 2,
  filmName: "电影二",
  price: 30
}, {
  id: 3,
  filmName: "电影三",
  price: 30
}];

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
    hello: String,
    getName: String,
    getAge: Int,
    getAllNames: [String],
    getAllAges: [Int],
    getAccountInfo: AccountInfo,
    getFilmList: [Film],
    getFilmDetail(id: Int!): Film
  }
  
`);
// 处理器：具体实现该查询的方法
const root = {
  hello: () => {
    const str = "hello world";
    return str;
  },
  getName: () => "陈秋丽",
  getAge: () => 100,
  getAllNames () {
    return ["aaa", "bbb", "ccc"];
  },
  getAllAges () {
    return [10, 20, 30];
  },
  getAccountInfo () {
    return {
      name: "老六",
      age: 20,
      location: "广东广州"
    };
  },
  // 列表页，返回所有信息
  getFilmList () {
    return fakeFilmList;
  },
  // 详情页，根据id查询某条信息
  getFilmDetail ({ id }) {
    return fakeFilmList.filter(item => item.id === id)[0];
  }
};

// 注意这里一定要是use，router.use或app.use
router.use("/", graphqlHttp({
  schema: Schema,
  rootValue: root,
  graphiql: true
}));

module.exports = router;