const express = require("express");
const router = express.Router();

const { buildSchema } = require("graphql");
const graphqlHttp = require("express-graphql");

let fakeFilmList = [{
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
  type Film {
    id: Int,
    filmName: String,
    price: Int
  }

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
  getFilmList () {
    return fakeFilmList;
  },

  createFilm ({ input }) {
    const newData = { ...input, id: fakeFilmList.length + 1 };
    fakeFilmList.push(newData);
    return newData;
  },

  updateFilm ({ id, input }) {
    // console.log(id, input);
    let current = null;

    fakeFilmList = fakeFilmList.map(item => {
      if (item.id === id) {
        current = { ...item, ...input };
        return { ...item, ...input };
      }
      return item;
    });

    return current;
  },

  deleteFilm ({ id }) {
    fakeFilmList = fakeFilmList.filter(item => item.id !== id);
    return 1;
  }
};

// 注意这里一定要是use，router.use或app.use
router.use("/", graphqlHttp({
  schema: Schema,
  rootValue: root,
  graphiql: true
}));

module.exports = router;