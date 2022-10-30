async function conn () {
  const mysql = require("mysql2/promise");
  const config = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'test',
  };
  const connection = await mysql.createConnection(config);
  return connection;
}

module.exports = conn;