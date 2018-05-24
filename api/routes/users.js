var express = require("express");
var bodyParser = require('body-parser');

var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var useraccountsModel = require('../models/userAccount');
var authenticationModel = require('../models/userAuthentication');
var users= express.Router();
users.use(bodyParser.json());

users.route('/:userId')
    .get(function (req, res, next) {
        var userId = req.params.userId;
        useraccountsModel.find({ userId: userId }, function (err, details) {
            if (err) throw err;
            res.json(details);
        });
    });

module.exports = users;