"use strict";

(function(angular){
    angular.module("mainApp")
        .controller("mainCntl", function($scope, $http, $interval){
            //load most popular PiNS 
            $scope.queue = [];
            $scope.popularWins = [];
            var $grid = $(".grid").masonry({
                itemSelector : ".grid-item",
                columnWidth : 100,
                transitionDuration : "0.4s",
            });  
            $scope.popularWins = $http.get("/api/wins/popular")
                .then(function(result){
                    console.log("popular wins : ", result.data);
                    if(result.data.length <= 2) {
                        $scope.popularWins = result.data;
                    }else {
                        var n = result.data.length;
                        $scope.popularWins = result.data.slice(0, 2);
                        $scope.queue = result.data.slice(2);
                        $scope.timer = $interval(popWin, 1500, 5);
                    }
                    $grid.imagesLoaded().progress( function() {
                      $grid.masonry();
                    }); 
                })
                .catch(function(err){
                    throw err;
                });
            
            function popWin(){
                if($scope.queue.length != 0) {
                    
                    var win = $scope.queue.shift();
                    console.log("poped : ", win);
                    $scope.popularWins.unshift(win);
                }else {
                    console.log("cancelling timer");
                    $interval.cancel($scope.timer);
                }
            }
        })
})(window.angular);