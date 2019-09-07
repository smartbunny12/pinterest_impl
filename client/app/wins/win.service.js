"use strict";

(function(angular){
    angular.module("mainApp")
        .factory("Win", function($http){
            
            return {
                "like" : function(win,userId, cb){
                    $http.post("/api/wins/like/" + win._id, {"userId" : userId})
                        .then(function(res){
                            return cb(null, res.data);
                        })
                        .catch(function(err){
                            return cb(err, null);
                        });
                },
                
                "reblog": function(win, userId, cb){
                    $http.post("/api/wins/reblog/" + win._id, {"userId" : userId})
                        .then(function(res){
                            return cb(null, res.data);
                        })
                        .catch(function(err){
                            return cb(err, null);
                        });
                },
                
                "deleteWin" : function(winId,userId, cb){
                    $http.delete("/api/wins/"  + winId)
                        .then(function(res){
                            return cb(null, res.data);
                        })
                        .catch(function(err){
                            return cb(err, null);
                        });
                },
                
                "createWin" : function(title, picUrl, createrId, cb) {
                    //console.log(picUrl)
                    $http.post("/api/wins", {
                        title : title,
                        picUrl : picUrl,
                        createrId : createrId,
                        timeStamp : new Date()
                    }).then(function(res){
                        return cb(null, res.data);
                    }).catch(function(err){
                        return cb(err, null);
                    });
                },
                
                "unreblog" : function(userId, winId,cb){
                    $http.post("/api/wins/unreblog/" + winId, {
                        userId : userId
                    }).then(function(res){
                        return cb(null, res.data);
                    }).catch(function(err){
                        return cb(err, null);
                    });
                }
            };
        });
})(window.angular);