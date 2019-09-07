"use strict";

(function(angular){
    angular.module("mainApp")
        .controller("modalCntl", function($scope,$uibModalInstance){
            $scope.title = "";
            $scope.srcurl = "";
            $scope.ok = function(){
                if($scope.title.length == 0 || $scope.srcurl.length == 0) {
                    $scope.errInfo = "please input title and pin url";
                    return;
                }
                console.log($scope.srcurl);
                var pin = {
                    title : $scope.title,
                    srcurl : $scope.srcurl
                };
                $uibModalInstance.close(pin);
            };
            
            $scope.cancel = function(){
                $uibModalInstance.dismiss("cancel");
            };
        });
})(window.angular);