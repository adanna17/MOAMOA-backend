var mysql = require('mysql');

var DBoptions = {
  host:'moamoa-database.cmclvpcsh0vw.ap-northeast-1.rds.amazonaws.com',
  port:'3306',
  user:'jungmin',
  password:'6k9ojw098427',
  database : 'MOAMOA'
};

module.exports = mysql.createConnection(DBoptions);
