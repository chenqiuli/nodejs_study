### Mongodb 配置

```bash
1.安装，配置环境变量
2.mongo --version
3.mongod.exe --dbpath="C:\Users\qiu\Desktop\nodejs\24-Express-cli\db" // 指定数据库存放目录，不可关闭，关闭即表示关闭服务器
4.mongo.exe // 客户端，测试数据库是否已开启，可以执行mongo指令
```

### Mongodb 数据库存放在 24-Express-cli/db 下

检查数据库是否启用成功
![mongodb是否启用成功](./assets/mongodb.png)

<hr>

### Mongodb 命令行

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

<hr>

### nodejs 操作 Mongodb，利用 mongoose 模型工具

#### 1.mongoose 连接 mongodb 数据库

```js
const mongoose = require('mongoose');

/**
 * 连接mongodb，连接成功返回一个promise对象
 */
mongoose
  .connect('mongodb://127.0.0.1:27017/nodejs_users')
  .then(() => {
    console.log('成功连接mogodb数据库');
  })
  .catch((err) => {
    console.log(err);
  });
```

<hr>

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

<hr>

#### 3.通过 Model 操作数据库 crud，遵循 restful 规范

#### restful 规范：接口路径没有动词，只有名词，用一个名词代替 crud 所有接口，但是使用不同的请求方法

```js
// 新增
router.post('/', function (req, res, next) {
  const { username, password, age } = req.body;
  UserModel.create({
    username,
    password,
    age,
  })
    .then((data) => {
      res.send({ ok: 1 });
    })
    .catch((err) => {
      res.send({ ok: 0 });
    });
});

// 删除 deleteOne deleteMany
router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  UserModel.deleteOne({ _id: id })
    .then((data) => {
      res.send({ ok: 1 });
    })
    .catch((err) => {
      res.send({ ok: 0 });
    });
});

// 更新 updateOne updateMany
router.put('/:id', function (req, res, next) {
  const { id } = req.params;
  const { username, password, age } = req.body;
  UserModel.updateOne(
    { _id: id },
    {
      username,
      password,
      age,
    }
  )
    .then((data) => {
      res.send({ ok: 1 });
    })
    .catch((err) => {
      res.send({ ok: 0 });
    });
});

/**
 * 查询所有  UserModel.find()
 * 查询指定字段   UserModel.find({}, ['username', 'age'])
 * 查询总数  UserModel.find({}, ['username', 'age']).count()
 * 待条件查询  UserModel.find({ age: 21 })
 * 排序 UserModel.find({}, ['username', 'age']).sort({ age: 1 })
 * 分页 UserModel.find({}).sort({ age: 1 }).skip((pageNum - 1) * pageSize).limit(pageSize)
 */
router.get('/', async function (req, res, next) {
  const { pageNum, pageSize } = req.query;
  const data = await UserModel.find({})
    .sort({ age: 1 })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);
  const totalCount = await UserModel.find({}, ['username', 'age']).count();
  res.send({
    data,
    totalCount,
  });
});
```

<hr >

#### 4.使用 MVC 架构

##### M 层 model ：接收 C 层传过来的参数，与数据库交互，返回给 C 层，使用 mongooes 有 model 模型层，所以这里的 M 层可以由 servicces 代替

##### V 层 view ：前端视图渲染

##### C 层 Controller ：接收前端换过来的参数，再传给 M 层，转发接口结果给 V 层

<hr >

#### 5.登录鉴权

![cookie+session设计草图](./assets/cookie%2Bsession.png)

##### json web token - 只能用于 ajax 请求接口的拦截

```bash
1.客户端登录完成，服务器返回token至返回头
2.客户端成功请求之前，把token存放至localStorage中
3.客户端发起请求之前，都要把token带上请求头
4.服务器统一处理响应所有接口，拿到token，使用之前的秘钥对比有没有被篡改，token有效返回接口数据，失效返回401，token只能用于前后端交互时使用，后端返回路由页面不可用
5.客户端取到数据，若401统一处理跳转登录页，若成功进入页面则再次把token存至localStorage中
```
