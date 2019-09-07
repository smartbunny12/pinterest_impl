"use strict";

var jwt = require("jsonwebtoken");
var config = require("../config/auth.config.js");
var compose = require("composable-middleware");
var users = require("../api/users/users.model.js");

var verifyjwt = require("express-jwt")({
    secret  : config.jwtsecret
});

module.exports = function(){
    
    return {
        "isAuthenticated" : function(){
            return compose()
                    .use(function(req, res, next){
                        //console.log("headers : ", req.headers);
                        verifyjwt(req, res, next);
                    })
                    .use(function(req, res, next){
                        //console.log("user id : ", req.user);
                        // users.findById(req.user._id,function(err, user){
                        //     if(err){
                        //         return res.json(401, err);
                        //     }
                        //     req.user = user;
                        //     return next();
                        // });
                        var query = users.findById(req.user._id).populate("wins");
                        query.exec(function(err, user){
                            if(err) {
                                return res.json(403, err);
                            }
                            req.user = user;
                           // console.log("auth user : ", req.user);
                            return next();
                        });
                    });
        },
        
        "signToken" : function(id){
            return jwt.sign({_id : id}, config.jwtsecret, {expiresIn : 60*30});
        },
        
        "signTokenCookie" : function(req, res, next){
            if(!req.user) {
                throw new Error({message : "WTF"});
            }
            var token = jwt.sign({_id : req.user._id}, config.jwtsecret, {expiresIn : 60*30});
            res.cookie("token", JSON.stringify(token));
            return res.redirect("/");
        }
    };
};