"use strict";

var passport = require("passport");
var auth = require("../auth.service.js")();

module.exports = function(app){
    app.post("/auth/local", function(req, res, next){
       // console.log("local");
        passport.authenticate("local", function(err, user){
            //console.log("helo");
            if(err && user){
                return res.json(403, err);
            }
            if(!user){
                if(err) {
                    return res.json({
                        "error" : "Do not have this email and please signup first"
                    });
                }else {
                    return res.json({
                        "error" : "The password is not correct and please reinput"
                    });
                }
            }
            var token = auth.signToken(user._id);
            return res.json({
                user : user,
                token : token
            });
        })(req, res, next);  // do remeber to call this func, otherwise it will not transfer     
    });
};