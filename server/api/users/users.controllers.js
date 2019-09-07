"use strict";

var wins = require("../wins/wins.model.js");
var users = require("../users/users.model.js");
var auth = require("../../auth/auth.service.js")();

module.exports = function(app){
    this.getAllUsers = function(){
        
    };
    
    this.getUser = function(req, res, next){
        var query = users.findById(req.params.id).populate("wins");
        query.exec(function(err, user){
            if(err) {
                return res.json(401, err);
            }
            return res.json(user);
        });
    };
    
    this.deleteUser = function(){};
    
    this.getMe  = function(req, res){
      //  console.log("req.user : ", req.user);
        return res.json(req.user);
    }
    
    this.createUser = function(req, res, next){
        users.findOne({"email" : req.body.email}, function(err, user){
            if(err){
                return res.json({
                    error : err
                });
            }
            if(user) {
                return res.json({
                    error : "user already exists and please login"
                });
            }
            
            var newuser = new users({
                email  : req.body.email,
                password : req.body.password,
                name : req.body.email,
                wins : [],
                liked : [],
                twitter: {}
            });
            
            newuser.save(function(err, user){
                if(err){
                    return res.json({
                        error : err
                    });
                }
               // console.log("auth : ", auth);
                var token = auth.signToken(user._id);
                return res.json({
                    token : token,
                    user : user
                });
            });
        });
    };
    
    this.changePwd = function(req, res, next){
        users.findById(req.params.id, function(err, user){
            if(err) {
                return res.json({
                    error  : err
                });
            }
            if(!user){
                return res.json({
                    error:  "no such user"
                });
            }else {
                if(user.twitter == undefined && user.password != req.body.oldPwd) {
                    return res.json({
                        error : "input password is not matched with database and please input the correct one"
                    });
                }else {
                    user.password = req.body.newPwd;
                    user.save(function(err, user){
                        if(err) {
                            return res.json({
                                error : err
                            });
                        }else {
                            return res.json({
                                user : user    
                            });
                        }
                    });
                }
            }
        })
    };
}