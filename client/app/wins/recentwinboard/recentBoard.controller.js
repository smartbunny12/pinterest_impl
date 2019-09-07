"use strict";

(function(angular){
    angular.module("mainApp")
        .controller("recentBoardCntl", function($scope, Socket, recentWins, Win, Auth, $location, $window){
            //wins setup
            var $grid = $(".grid").masonry({
                itemSelector : ".grid-item",
                columnWidth : 100,
                transitionDuration : "0.4s",
            });  
            $grid.imagesLoaded().progress(function(){
                $grid.masonry();
            });                
            $scope.wins = recentWins;
            $scope.currentUser = Auth.getUser();
            console.log("recent board curruser is : ", $scope.currentUser);
            console.log("recent board wins : ", $scope.wins);
            //socket io
            Socket.syncRecentWins("win", $scope.wins, function(){});
            
            $scope.getUserUrl = function(userid) {
                var tgurl =  "/userboard/" + userid;
                $window.location.href = tgurl;
            };
            
            $scope.like = function(win){
                //console.log(Auth.isLoggedin);
                if(!Auth.isLoggedin()) {
                    console.log("expired token");
                    $location.path("/login");
                }
                Win.like(win,$scope.currentUser._id,function(){
                    
                })
            };
            
            $scope.reblog = function(win){
                if(!Auth.isLoggedin()) {
                    $location.path("/login");
                }
                Win.reblog(win, $scope.currentUser._id, function(){});
            };
            
            $scope.showName = function(userid){
                console.log("show name : ",userid == $scope.currentUser._id );
                return userid == $scope.currentUser._id;
            }
        });
})(window.angular);