"use strict";

(function(angular){
    angular.module("mainApp")
        .controller("settingCntl", function($scope, Auth, $location){
            $scope.changePwd = function(form){
                if(form.$invalid) {
                    $scope.errInfo = "please input current password and new password";
                    return;
                }
                Auth.changePwd($scope.currPwd, $scope.newPwd)
                    .then(function(res){
                        if(res.error){
                            $scope.errInfo = res.error;
                        }else{
                            $location.path("/");
                        }
                    });
            };
        });
})(window.angular);