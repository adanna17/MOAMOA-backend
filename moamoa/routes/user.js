var express = require('express');
var router = express.Router();
var db = require('../util/db.js');

var ServerResult = {
  resultStatus : 'default'
};

router.post('/login',function(req,res){
  var checkUser = req.body.user_kaokao_id;

  var sql = 'SELECT user_kaokao_id, user_moa_id  FROM user WHERE user_kaokao_id = ?';
  db.query(sql, checkUser, function(err, result){
    if (err) {
      res.status(500);
      ServerResult.resultStatus = 'error';
      //오류 발생
    } else {
      if (result[0] == null) {
        ServerResult.resultStatus = 'new';
        // 신규 사용자일 경우
      }else{
        ServerResult.resultStatus = result[0].user_moa_id
        // 기존 사용자일 경우
      }
    }
    res.json(ServerResult);
  });
});
//기존 사용자인지 신규 가입자인지 확인

router.post('/register/repeat',function(req,res){

  var checkId = req.body.user_moa_id;

  var sql = 'SELECT user_moa_id FROM user WHERE user_moa_id = ? ';
  db.query(sql, checkId, function(err, result){
    if (err) {
      res.status(500);
      ServerResult.resultStatus = 'error';
      //오류 발생
    } else {
      if (result[0] == null) {
        ServerResult.resultStatus = 'success';
        // 중복 성공(사용할 수 있는 아이디)
      }else{
        ServerResult.resultStatus = 'fail';
        // 중복 실패(이미 사용중인 아이디)
      }
    }
    res.json(ServerResult);
  });
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
      res.status(500);
      ServerResult.resultStatus = 'error';
      //오류 발생
    } else {
      ServerResult.resultStatus = 'success';
    }
    res.json(ServerResult);
  });
});
//회원가입

module.exports = router;
