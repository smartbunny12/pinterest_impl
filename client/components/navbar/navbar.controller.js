"use strict";

(function(angular){
    angular.module("mainApp")
        .directive("myNavbar", function(){
            return {
                templateUrl : "/client/components/navbar/navbar.html",
                controller : "navbarCntl",
                scope: []
            };
        })
        .controller("navbarCntl", function($location, Auth, $scope){
            $scope.isAuthenticated = Auth.isLoggedin();
            $scope.currentUser = Auth.getUser();
//console.log("curruser  : ", $scope.currentUser);
            $scope.isActive = function(currState){
              //  console.log("current state: ", currState);
                currState = "/" + currState;
                return currState == $location.$$url;
            }
            $scope.logout = Auth.logout;
        })
})(window.angular);