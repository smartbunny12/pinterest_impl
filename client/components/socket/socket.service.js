"use strict";

(function(angular){
    angular.module("mainApp")
        .factory("Socket", function(){
           // console.log("iocao : ", io);
            var socket = io.connect();
            return {
                syncRecentWins : function(title, winarr, cb){
                    //var winarr = user.wins;
                   // var socket = io.connect();
                    socket.on(title + ":save", function(doc){
                        console.log("save socket from be : ", doc);
                        var index = -1;
                        for(var i = 0; i < winarr.length; i++) {
                            if(winarr[i]._id == doc._id) {
                                index = i;
                                break;
                            }
                        }
                        if(index == -1) {// new one 
                            winarr.push(doc);
                            //winarr.shift();
                        }else {
                            winarr[index] = doc;
                        }
                        return cb();
                    });
                    
                    socket.on(title + ":remove", function(doc){
                        var index = -1;
                        console.log("socket removing doc : ", doc, winarr);
                        for(var i = 0; i < winarr.length; i++) {
                            if(winarr[i]._id == doc._id) {
                                index = i;
                                break;
                            }
                        }
                        if(index != -1) {
                            winarr.splice(index, 1);
                        }
                        return cb();
                    });
                }
            };
        });
})(window.angular);