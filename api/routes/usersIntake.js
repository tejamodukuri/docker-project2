var express = require("express");
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var useraccountsModel = require('../models/userAccount');
var userintakeModel = require('../models/userIntake');

var userintake = express.Router();

userintake.use(bodyParser.json());
userintake.route('/')

  .get(function (req, res, next) {
  })

  .post(function (req, res) {
    var data = req.body;
    console.log(data);
    emailAvailability(data.emailId, function (result) {
      if (result == true) {
        intaking(data, function (result) {
          if (result !== false) {
            var info = new useraccountsModel({
              userName: data.emailId,
              emailId: data.emailId,
              phoneNumber: data.phoneNumber,
              legalBusinessName:data.legalBusinessName,
              description:data.description,
              emailId:data.emailId,
              zip:data.zip,
              state:data.state,
              country:data.country

            })
            info.save(function (err, users) {
              if (err) {
                res.status(403);
                res.json(false);
              } else {
                res.status(200);
                res.json(true);
              }
            });
          }
        })
      } else {
        res.status(403);
        res.json(false);
      }
    })
  })

  .delete(function (req, res, next) {
    // userintakeModel.remove({}, function (err, resp) {
    //   if (err) throw err;
    //   res.json(resp);
    // });
  });

function intaking(data, callback) {
  // console.log(JSON.stringify(data));
  if (typeof callback === 'function') {
    var info = new userintakeModel(data)
    info.save(function (err, users) {
      if (err) {
        callback(false);
      } else {
        callback(users);
      }
    });
  }

}
function emailAvailability(emailId, callback) {
  if (typeof callback === 'function') {
    userintakeModel.find({ email: emailId }, function (err, docs) {
      if (docs.length) {
        callback(false);
      } else {
        callback(true);
      }
    });
  }
}

module.exports = userintake;
