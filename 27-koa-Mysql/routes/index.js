const Router = require("koa-router");
const router = new Router();
const conn = require("../config/db.config");


router.get("/home", async (ctx) => {
  const { name } = ctx.query;
  const connection = await conn();
  // const [rows] = await connection.execute('select s.name as sname,s.class_id,c.name as cname from student s inner join classes c on s.class_id = c.id');
  const [rows] = await connection.execute('select * from student where name = ?', [name]);
  console.log(rows);
  ctx.body = rows;
});

module.exports = router;