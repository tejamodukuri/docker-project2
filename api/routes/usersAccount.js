var express = require("express");
var bodyParser = require('body-parser');
var crypto = require('crypto');

var useraccountsModel = require('../models/userAccount');
var authenticationModel = require('../models/userAuthentication');
// var jwt  =  require(jwtauth);

var accounts = express.Router();
accounts.use(bodyParser.json());
accounts.route('/')

  .get(function (req, res, next) {
    // useraccountsModel.find({}, function (err, useraccountsModel) {
    //   if (err) throw err;
    //   res.json(useraccountsModel + "working ");
    // });
    res.json("userAccounts get calll");
  })

  .post(function (req, res) {
    var data = req.body;
    console.log(data);
    oneWayHash(data.password, function (hashPassword) {    
      useraccountsModel.findOneAndUpdate({ userName: data.userName, phoneNumber: data.phoneNumber },
        { $set: { } }, { new: true }, function (err, doc) {
          if (err) {
            res.status(403);
            res.json(false);
          } else {
            if (doc) {
              findAndSaveAuth(doc.userId, doc.zervPlatformAcctNumber, hashPassword, data, function (result) {
                if (result !== false) {
                  res.status(200);
                  res.json(doc);
                } else {
                  res.status(403);
                  res.json(false);
                }
              })
            } else {
              console.log(doc);
              res.status(403);
              res.json(false);
            }
          }
        });
    })
  })
  .put(function (req, res, next) {
    var data =  req.body;
    console.log(JSON.stringify(data));
    useraccountsModel.findOneAndUpdate({ userId: data.userId},
      { $set: data }, { new: true }, function (err, doc) {
        if (err) throw err
        res.json(doc);
    });
  })
  .delete(function (req, res, next) {
    // useraccountsModel.remove({}, function (err, resp) {
    //   if (err) throw err
    //   res.json(resp);
    // });
  });
function oneWayHash(data, callback) {
  if (typeof callback === 'function') {
    var hashPassword = crypto.createHash('md5').update(data).digest("hex");
    callback(hashPassword);
  }
}
function findAndSaveAuth(userId, zervPlatformAcctNumber, hashPassword, data, callback) {
  console.log("userId" , userId);
  if (typeof callback === 'function') {
    // console.log("confirm : " + ZERVPlatformAcctNumber + " : " +user_id+ " : " + hashPassword +" : " + JSON.stringify(data) );
    // confirm : 1000000000 : 100 : dbba05e11809d7ec291421b1b324f93a : {"email":"m@m.com","accInfoPassword":"123LKJ@#$","phoneCode":"+1","phonenumber":"1231231234"}
    authenticationModel.findOneAndUpdate({ userId: userId,  userName: data.userName },
      { $set: { encryptedUserPassword: hashPassword, zervPlatformAccNumber: zervPlatformAcctNumber ,phoneNumber:data.phoneNumber,status : 'INACTIVE' } }, { upsert: true, new: true }, function (err, document) {
        if (err) {
          callback(false);
        } else {
          if (document) {
            console.log("FIrst auth : " + JSON.stringify(document));
            callback(true);
          } else {
            console.log("if zp dock not found : " + JSON.stringify(document));
            callback(false);
          }

        }
      });
  }
}
module.exports = accounts;