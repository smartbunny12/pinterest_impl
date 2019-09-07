"use strict";

(function(angular){
    angular.module("mainApp")
        .factory("User", function($resource){
            return $resource("/api/users/:id", {}, {
                "getMe" : {
                    "method" : "GET",
                    "params" : {id : "me"}
                }, 
                
                "changePwd" : {
                    "method" : "PUT",
                },
                
                "getUser" : {
                    "method" : "GET",
                    
                }
            })
        });
})(window.angular);