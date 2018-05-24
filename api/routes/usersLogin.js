var express = require("express");
var bodyParser = require('body-parser');

var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var useraccountsModel = require('../models/userAccount');
var authenticationModel = require('../models/userAuthentication');
var userlogin = express.Router();
userlogin.use(bodyParser.json());
userlogin.route('/')

  .get(function (req, res, next) {
    useraccountsModel.find({}, function (err, useraccountsModel) {
      if (err) throw err;
      res.json(useraccountsModel + "working ");
    });
  })

  .post(function (req, res) {
    var data = req.body;
    console.log(JSON.stringify(data));
    oneWayHash(data.password, function (hashPassword) {
      console.log(hashPassword);
      authenticationModel.find({
        userName: data.userName,
        encryptedUserPassword:hashPassword
      },
        function (err, users) {
          if (err) {
            res.send(err);
          } else {
            // res.json(users);
            if (users.length > 0) {
              var token = jwt.sign({
                id: "user"
              }, "mysecret", {
                  expiresIn: 86400 // expires in 24 hours
                });
              res.status(200);
              res.json({ token: token, accStatus: users[0].status, userId: users[0].userId });
            } else {
              res.status(500);
              res.send("/#/login");
            }
          }
        });
    })
  })

  .delete(function (req, res, next) {
    useraccountsModel.remove({}, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

  userlogin.route('/:userId')

  .get(function (req, res, next) {
     var userId  = req.params.userId;
    useraccountsModel.find({userid : userId}, function (err, details) {
      if (err) throw err;
      res.json(details );
    });
  });

function oneWayHash(data, callback) {
  if (typeof callback === 'function') {
    var hashPassword = crypto.createHash('md5').update(data).digest("hex");
    callback(hashPassword);
  }
}

module.exports = userlogin;