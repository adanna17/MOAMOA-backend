var express = require('express');
var router = express.Router();
var db = require('../util/db.js');

var ServerResult = {
  bResult : false
};

router.post('/login',function(req,res){
  var checkUser = req.body.user_kaokao_id;

  var sql = 'SELECT user_kaokao_id FROM user';
  db.query(sql, function(err, result){
    if (err) {
      res.status(500);
      ServerResult.bResult = false;
    } else {
      for (var i = 0; i < result.length; i++) {
        if (checkUser == result[i].user_kakao_id) {
          ServerResult.bResult = true;
        }
      }
      res.json(ServerResult);
    }
  });

});
//기존 사용자인지 신규 가입자인지 확인

router.post('/register/repeat',function(req,res){

  var checkId = req.body.user_moa_id;
  console.log(checkId);

  var sql = 'SELECT user_moa_id FROM user';
  db.query(sql, function(err, result){
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      for (var i = 0; i < result.length; i++) {
        if (checkId == result[i].user_moa_id) {
          ServerResult.bResult = true;
        }
      }
    }
  });

  res.json(ServerResult);

});
//회원가입시 아이디 중복확인

module.exports = router;
