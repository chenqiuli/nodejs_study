### Mongodb 命令行

```bash
1.安装，配置环境变量
2.mongo --version
3.mongod.exe --dbpath="C:\Users\qiu\Desktop\nodejs\24-Express-cli\db" // 指定数据库存放目录，不可关闭，关闭即表示关闭服务器
4.mongo.exe // 客户端，测试数据库是否已开启
```

```bash
help      // 帮助命令

show dbs  // 查看数据库，除了三个默认的数据库，其他的需要有集合才能查询到
use db   // 没有就创建数据库，有就切换
db       // 查看当前所在的数据库

db.createCollection("users") // 创建集合
db.getCollectionNames()      // 查看集合
db.test.drop()               // 删除某个集合，test是集合名

db.test.save({ username: 'qiu', age: 12 })          // 插入一条文档数据
db.test.save([{ username: 'qiu', age: 12 }, { username: 'qiuli', age: 12 }]) // 插入多条文档数据
db.test.remove({ age: 12 })                         // 删除匹配检索的文档数据
db.test.remove({})                                  // 删除文档全部数据
db.test.updata({username: 'qiuli'},{age: 100})      // 直接替换,只剩 age: 100
db.test.updata({ username: 'qiuli' }, {$set: { age: 12 }})   // 修改username=qiuli的集合的age=12
db.test.update({ username: 'qiuli' }, {$inc: { age: 10 }})   // 修改username=qiuli的集合的age在原基础上+10
db.test.update({ username: 'qiuli' }, {$inc: { age: -10 }})  // 修改username=qiuli的集合的age在原基础上-10
db.test.find()                          // 查询test集合的文档
db.test.find({ username:'qiuli' })      // 带条件的查询
db.test.find({ age:{$gt:20 } })         // gt:大于20  gte:大于等于20  gte:greater than equal
db.test.find({ age:{$lt:20 } })         // lt:小于20  lte:小于等于20  lte:less than equal
db.test.find({ age:{$lt,100,$gt:20 } }) // 大于20且小于100的
db.test.find({ $or:[{age:1},{age:2}] }) // 1或者2的年龄
db.test.find({ username:/q/ })          // 模糊查询，使用正则
db.test.find({},{ username: 1, _id: 0 })// 查询指定字段  1-想要这个字段  0-不想要这个字段
db.test.find({}).limit(5)                 // 前5条
db.test.find({}).skip(pageNum - 1 * 5).limit(5)    // 查询第几页数据，一页返回5条
db.test.find({}).sort({age:1})           // 升序
db.test.find({}).sort({age:-1})          // 降序
db.test.find({}).count()                 // 计数
db.test.find({}).sort({age:1}).skip(0).limit(2).count()   // 方法可以连用
```

### Mongodb 与 MySQL 区别

|         | MySQL                        | Mongodb                                |
| ------- | ---------------------------- | -------------------------------------- |
| 类型    | 关系型                       | 非关系型                               |
| 区别    | 字段有明确的类型及字段名限制 | 没有类型限制，可以随意插入不同的字段名 |
| 库      | database                     | database                               |
| 表/集合 | table                        | collection                             |
| 行/文档 | row                          | document                               |
| 列/字段 | column                       | field                                  |

### nodejs 操作 Mongodb，利用 mongoose 模型工具

#### 1.mongoose 连接 mongodb 数据库

```js
const mongoose = require('mongoose');

/**
 * 连接mongodb，连接成功返回一个promise对象
 */
mongoose.connect('mongodb://127.0.0.1:27017/nodejs_users', (err) => {
  if (!err) {
    console.log('连接成功');
  } else {
    throw err;
  }
});
```

#### 2.创建模型

```js
/**
 * 创建用户模型并导出
 * Schema - 对应mongodb中field
 * Model - 对应mongodb中collection
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  age: Number,
});

// 模型为user，创建出来后集合名为users
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
```

#### 3.通过 Model 定义 Entity

```js
const UserEntity = new UserModel({
  username,
  password,
  age,
});
```
