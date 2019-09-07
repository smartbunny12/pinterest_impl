"use strict";

(function(angular){
    angular.module("mainApp")
        .config(function($stateProvider){
            $stateProvider.state("login", {
                url : "/login",
                templateUrl : "/client/app/account/login/login.html",
                controller : "loginCntl"
            })
            .state("signup", {
                url : "/signup",
                templateUrl : "/client/app/account/signup/signup.html",
                controller : "signupCntl"
            })
            .state("setting", {
                url : "/setting",
                templateUrl : "/client/app/account/setting/setting.html",
                controller : "settingCntl"
            });
        });
})(window.angular);