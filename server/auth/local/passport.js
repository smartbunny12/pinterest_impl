'use strict';

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var users = require("../../api/users/users.model.js");

exports.setup = function(app){
  //  console.log("valid");
    passport.use(new LocalStrategy({
        "usernameField" : "email",
        "passwordField" : "password"
    }, function(email, password, done){
       // console.log(email, password);
        var query = users.findOne({"email" : email}).populate("wins");
        query.exec(function(err, user){
            //console.log("login user : ", user);
            if(err){
                return done(err, true);
            }
            if(!user) {
                return done(new Error("do not have this user email"),false);
            }else {
                if(user.password != password) {
                    return done(null,false);
                }
                return done(null, user);
            }
        });
    }));
}