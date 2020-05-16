/**
 * 连接数据库模块
 * create by XDC
 * */

var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root', // 用户名
  password: 'root', // 密码
  database: 'news', // 数据库名字
  port: '3306' // 端口号
})

conn.connect()

console.log('connection is success!')

module.exports = conn;