//1。 创建服务器文件

const mysql = require('mysql');

//2. 创建mysql链接  输入链接地址以及用户名 用户密码 所使用的数据库
const conn = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'alishow',
    multipleStatements:true
});

//3. 链接mysql
conn.connect();

//4. 导出conn对象
module.exports = conn;