"use strict";

var users = require("../users/users.model.js");
var wins = require("../wins/wins.model.js");

module.exports = function(){
    this.getRecent = function(req, res, next){
        var query = wins.find().sort("-timeStamp").populate("creater", "name _id").limit(100);//?? could optimize, Modify: when some win fail and delete
        query.exec(function(err, results){
            if(err) {
                return res.json(403, err);
            }
            return res.json(results);
        });
    };
    
    this.getWin = function(req, res, next){

    };
    
    this.deleteWin = function(req, res, next){
     //   console.log("deleting req : ", req.user);
        wins.findById(req.params.id, function(err, win){
            if(err) {
                return res.json(403, err);
            }
            var userid = win.creater;
            var winid = win._id;
            win.remove(function(err, result){
                if(err) {
                    return res.json(403, err);
                }
               // return res.send(200);
               users.findById(req.user._id, function(err, user){
                   if(err){
                       return res.json(403, err);
                   }
                   var index = user.wins.indexOf(req.params.id);
                   if(index == -1) {
                       return res.json(user);
                   }else {
                       user.wins.splice(index, 1);
                       user.save(function(err, user){
                           if(err) {
                               return res.json(403, err);
                           }
                           return res.json(user);
                       });
                   }
               })
            });
        });
    };
    
    this.getPopular = function(req, res, next){
        var query = wins.find().sort({"hearts" : -1}).populate("creater", "name _id").limit(4);//modify??
        query.exec(function(err, results){
            if(err) {
                return res.json(401, err);
            }
            return res.json(results);
        });
    };
    
    this.likeWin = function(req,res,next){
        users.findById(req.body.userId, function(err, user){
            if(err) {
                return res.json(403, err);
            }
            if(!user) {
                return res.json(403, new Error("no such user, shouldn't happen"));
            }
            var increase = 0;
            //console.log("like user : ", user);
            //console.log("check pin id : ", req.params.id);
            if(user.liked.indexOf(req.params.id) != -1) {
                user.liked.splice(user.liked.indexOf(req.params.id), 1);
                increase  = -1;
            }else {
                user.liked.push(req.params.id);
                increase = 1;
            }
            user.save(function(err, user){
                if(err){
                    return res.json(403, err);
                }
                var query =  wins.findById(req.params.id).populate("creater", "_id name") ;
                query.exec(function(err,win){
                    if(err) {
                        return res.json(403, err);
                    }
                    win.hearts += increase;
                    win.save(function(err, win){
                        if(err){
                            return res.json(403, err);
                        }
                        return res.json(win);
                    });
                });                
            });

        });
    };
    
    this.reblogWin = function(req, res, next){
        users.findById(req.body.userId, function(err, user){//requester
            if(err) {
                return res.json(403, err);
            }
            if(!user){
                return res.json(403,err);
            }
            if(user.wins.indexOf(req.params.id) != -1) {
                return res.json(403, new Error("You already have this pin"));
            }else {
                user.wins.push(req.params.id);
                var query = wins.findById(req.params.id).populate("creater", "name _id");
                query.exec(function(err, win){
                    if(err){
                        return res.json(403, err);
                    }
                    win.reblogs++;
                    win.save(function(err, win){
                        if(err){
                            return res.json(403, err);
                        }
                        user.save(function(err, user){
                            if(err) {
                                return res.json(403, err);
                            }
                            return res.json(user);
                        });                        
                    });
                });
            }
        })
    };
    
    this.createWin = function(req, res, next){
       // console.log("req for creating win : ", req.body);
        var newwin = new wins({
            title : req.body.title,
            picUrl : req.body.picUrl,
            timeStamp : req.body.timeStamp,
            creater : req.body.createrId
        });
        newwin.save(function(err, win){
            if(err) {
                return res.json(403, err);
            }
            users.findById(req.body.createrId, function(err, user){
                if(err){
                    return res.json(403, err);
                }
                //console.log("found user : ", user);
                if(user.wins.indexOf(req.body.createrId) != -1) {
                    return res.json(win);
                }else {
                    user.wins.push(win._id);
                 //   console.log("pushed win : ", user.wins);
                    user.save(function(err){
                        if(err) {
                            return res.json(403, err);
                        }
                        return res.json(win);
                    });
                }
            });
        });
    };
    
    this.unreblog = function(req, res, next){
        users.findById(req.body.userId, function(err, user){
            if(err) {
                return res.json(403, err);
            }
            if(!user){
                return res.json(user);
            }
            var index = user.wins.indexOf(req.params.id);
            if(index == -1) {
                return res.json(user);
            }else {
                var wins = user.wins;
                wins.splice(index, 1);
                user.wins = wins;
                user.save(function(err, user){
                    if(err){
                        return res.json(403, err);
                    }
                    return res.json(user);
                });
            }
        })    
    };
};