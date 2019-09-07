"use strict";

(function(angular){
    angular.module("mainApp")
        .controller("userBoardCntl", function($scope, targetUser, $http, Auth, $location, Win, Socket){
            $scope.tgUser = targetUser;
            $scope.userProfile = true;
            console.log("target user : ", targetUser.wins);
            var currentUser = Auth.getUser();
            $scope.wins = targetUser.wins;
            
            var $grid = $(".grid").masonry({
                itemSelector : ".grid-item",
                columnWidth : 200,
                transitionDuration : "0.4s"
            });  
            $grid.imagesLoaded().progress(function(){
                $grid.masonry();
            });             
            //io socket
            Socket.syncRecentWins("win", $scope.wins, function(){});
            
            $scope.isDisable = function(){
                console.log($location.$$url);
                return !/userboard/.test($location.$$url);
            };
            currentUser.$promise.then(function(currentUser){
                $scope.like = function(win){
                    if(!Auth.isLoggedin()) {
                        $location.path("/login");
                    }
                    Win.like(win,currentUser._id,function(){
                        
                    })
                };
                
                $scope.reblog = function(win){
                    if(!Auth.isLoggedin()) {
                        $location.path("/login");
                    }
                    Win.reblog(win, currentUser._id, function(){});
                };                
            });
        });
})(window.angular);