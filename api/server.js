var express = require('express');
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || 6060;


var mongoose = require('mongoose');   
var Schema = mongoose.Schema;

var url = 'mongodb://mongo:27017/CRDB02';
// mongoose.Promise = require('bluebird');
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    console.log("Connected correctly to server");
});



var routes = require('./routes/index');
var userIntake = require('./routes/usersIntake');
var usersAccount = require('./routes/usersAccount');
var usersLogin = require('./routes/usersLogin');
var users = require('./routes/users');
var jwtauth = require('./routes/jwtauth.js');


var usersMFA = require('./routes/usersMFA');
var usersProfile = require('./routes/usersProfile');


var app = express();
var cors = require('cors');


app.use(express.static(__dirname + '/'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Max-Age", "3600");

    next();
});
app.use('/', routes);
// app.use('/users/intrests', userIntrests);
app.use('/users/intake', userIntake);
app.use('/users/account', usersAccount);
app.use('/users/login', usersLogin);

app.use('/users/mfa', jwtauth, usersMFA);
app.use('/users/profile', jwtauth, usersProfile);
app.use('/users', jwtauth, users);


app.listen(port);
console.log('Magic happens on port ' + port);
