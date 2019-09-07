"use strict";

(function(angular){
    angular.module("mainApp")
        .controller("loginCntl", function($scope, Auth, $cookieStore, $state, $window){
            $scope.loggin = function(form) {
                if(form.$invalid) {
                    $scope.errInfo = "please input email and password";
                    return;
                }
                Auth.login($scope.myEmail, $scope.myPwd)
                    .then(function(result){
                        if(result.error) {
                            $scope.errInfo = result.error; 
                        }else {
                            $state.go("main");    
                        }
                    });
            }
            $scope.twitterLogin = function(){
                $window.location.href = "/auth/twitter";
            }
        });
})(window.angular);