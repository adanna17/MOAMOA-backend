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

  var sql = 'SELECT user_moa_id FROM user';
  db.query(sql, function(err, result){
    if (err) {
      console.log(err);
      res.status(500);
      ServerResult.bResult = false;
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

router.post('/register/submit',function(req,res){

  var user = {
    user_profile_name : req.body.user_profile_name,
    user_profile_image : req.body.user_profile_image,
    user_moa_id : req.body.user_moa_id,
    user_kaokao_id : req.body.user_kaokao_id
  };

  var sql = 'INSERT INTO user SET ?';
  db.query(sql, user, function(err, result){
    if (err) {
      console.log(err);
      res.status(500);
      ServerResult.bResult = false;
    } else {
      ServerResult.bResult = true;
    }
  });

  res.json(ServerResult);

});
//회원가입

module.exports = router;
