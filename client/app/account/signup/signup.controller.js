"use strict";

(function(angular){
    angular.module("mainApp")
        .controller("signupCntl", function($scope, Auth, $location, $window, $state){
            $scope.signup = function(form){
              //  console.log("form : ", form);
                if(form.$invalid) {
                    $scope.errInfo = "please input email and password";
                }else {
                    Auth.signup($scope.myEmail, $scope.myPwd)
                        .then(function(res){
                            console.log("sign up results : ", res);
                            if(res.error) {
                                $scope.errInfo = res.error;
                            }else {
                               // $location.path("/");
                               $state.go("main");
                            }
                        });
                }
            };
            
            $scope.twitterLogin = function(){
                $window.location.href = "/auth/twitter"; 
            };
        });
})(window.angular);