"use strict";

(function(angular){
    angular.module("mainApp")
        .config(function($stateProvider){
            $stateProvider.state("main", {
                url : "/",
                templateUrl : "/client/app/main/main.html",
                controller : "mainCntl"
            })
        });
})(window.angular);