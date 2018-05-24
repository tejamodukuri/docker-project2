var express = require("express");
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var crypto = require('crypto');

var useraccountsModel = require('../models/userAccount');
var authenticationModel = require('../models/userAuthentication');

var userMFA = express.Router();

userMFA.use(bodyParser.json());

var mfacode = "0123";


userMFA.route('/')
	.get(function (req, res, next) {
		res.json('hitting tokens');
	})
	.post(function (req, res, next) {
		var data = req.body;
		console.log(JSON.stringify(data));
		if(data.mfaEmailCode == mfacode){

			oneWayHash(data.password ,function(hashPassword){
				console.log(hashPassword);
				authenticationModel.find({userId : data.userId, encryptedUserPassword : hashPassword  }, function (err, details) {
					if (err) throw err;
					res.json(details) ;
				});
			})
			
		}else{
			res.status(500);
			res.send(false);
		}

	});

userMFA.route('/call')

	.get(function (req, res, next) {

		res.send('hit');

	});

userMFA.route('/text')

	.get(function (req, res, next) {

		res.send('hit');

	});

	function oneWayHash(data, callback) {
		if (typeof callback === 'function') {
		  var hashPassword = crypto.createHash('md5').update(data).digest("hex");
		  callback(hashPassword);
		}
	  }

module.exports = userMFA;