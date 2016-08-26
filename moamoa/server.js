var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var user = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', user);

app.listen(3000, function () {
  console.log('listening on moamoa sever 3000 port');
});
