var express = require('express')();
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mysql = require('mysql');

var options = {
  host:'moamoa-database.cmclvpcsh0vw.ap-northeast-1.rds.amazonaws.com',
  port:'3306',
  user:'jungmin',
  password:'6k9ojw098427',
  database : 'MOAMOA'
};

var connection = mysql.createConnection(options);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var ServerResult = {
  bResult : false
};

app.post('/login',function(req,res){

  var checkUser = req.body.kakaoId;

  console.log(checkUser);

  var sql = 'SELECT kakaoid FROM moauser';
  connection.query(sql, function(err, result){
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      for (var i = 0; i < result.length; i++) {
        if (checkUser == result[i].kakaoid) {
          ServerResult.bResult = true;
        }
      }
      res.json(ServerResult);
    }
  });

});
//기존 사용자인지 신규 가입자인지 확인

app.post('/register/repeat',function(req,res){

  var checkId = req.body.moamoaId;

  var sql = 'SELECT moaid FROM moauser';
  connection.query(sql, function(err, result){
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      for (var i = 0; i < result.length; i++) {
        if (checkId == result[i].moaid) {
          ServerResult.bResult = true;
        }
      }
    }
  });

  res.json(ServerResult);

});
//회원가입시 아이디 중복확인

app.post('/register/submit',function(req,res){

  var user = {
    kakaoid : req.body.kakaoId,
    profileImage : req.body.kakaoProfileImage,
    moaid : req.body.moaId,
    nickname : req.body.moaNickname
  };

  console.log(user);

  var sql = 'INSERT INTO moauser SET ?';
  connection.query(sql, user, function(err, result){
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      ServerResult.bResult = true;
    }
  });

  res.json(ServerResult);

});
//회원가입

http.listen(3000, function(){
  console.log('listening on moamoa sever 3000 port');
});
