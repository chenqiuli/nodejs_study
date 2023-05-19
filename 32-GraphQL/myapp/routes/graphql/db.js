const express = require("express");
const router = express.Router();

const { buildSchema } = require("graphql");
const graphqlHttp = require("express-graphql");

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
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/maizuo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// 3. 定义Schema
var FilmModel = mongoose.model("film", new mongoose.Schema({
  filmName: String,
  price: Number
}));


// 定义GraphQL的Schmea，有哪些可以查询的方法
const Schema = buildSchema(`
  type Film {
    id: String,
    filmName: String,
    price: Int
  }

  input FilmInput {
    filmName: String,
    price: Int
  }

  type Query{
    getFilmList: [Film],
    getOneFilmList(id: String!): [Film]
  } 
  
  type Mutation {
    createFilm(input: FilmInput): Film,
    updateFilm(id: String!, input: FilmInput): Film,
    deleteFilm(id: String!): Int
  }
`);

// 处理器：具体实现该查询的方法  
const root = {
  // 查所有 
  getFilmList () {
    // 数据库的_id自动对应Film的id
    return FilmModel.find({});
  },
  // 查具体
  getOneFilmList ({ id }) {
    return FilmModel.find({ _id: id });
  },
  // 增
  createFilm ({ input }) {
    return FilmModel.create({
      ...input
    });
  },
  // 改
  updateFilm ({ id, input }) {
    return FilmModel.updateOne({
      _id: id
    }, {
      ...input
    }).then(res => FilmModel.find({ _id: id })).then(res => {
      // console.log(res);
      return res[0];
    });
  },
  // 删
  deleteFilm ({ id }) {
    return FilmModel.deleteOne({
      _id: id
    }).then(res => res.ok);
  }
};

// 注意这里一定要是use，router.use或app.use
router.use("/", graphqlHttp({
  schema: Schema,
  rootValue: root,
  graphiql: true
}));

module.exports = router;