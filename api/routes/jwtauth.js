  
var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // console.log( JSON.stringify(req.headers.token));
    jwt.verify(req.headers.token, "mysecret", function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            // res.json({
            //     text: "this is protected",
            //     data: data
            // });
            next();
        }
    });
};