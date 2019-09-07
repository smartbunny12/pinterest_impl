"use strict";

var passport = require("passport");
var TwitterStrategy = require("passport-twitter");
var config = require("../../config/auth.config.js");
var users = require("../../api/users/users.model.js");

exports.setup = function(app){
    passport.use(new TwitterStrategy({
        consumerKey : config.twitter.consumerKey,
        consumerSecret : config.twitter.consumerSecret,
        callbackUrl: config.twitter.callbakUrl
    }, function(token, refreshToken, profile, done){
        var query = users.findOne({"twitter.id" : profile._json.id}).populate("wins") 
        query.exec(function(err, user){
            if(err) {
                return done(err, false);
            }
          //  console.log("profile : ", profile);
            if(!user){
                var newuser = new users({
                    name : profile.displayName,
                    email : "",
                    password : "",
                    wins : [],
                    liked : [],
                    twitter : profile._json
                });
                
                newuser.save(function(err, user){
                    if(err) {
                        return done(err, false);
                    }else {
                        return done(null, user);
                    }
                });
            }else {
                return done(null, user);
            }  
        });
    }));
}