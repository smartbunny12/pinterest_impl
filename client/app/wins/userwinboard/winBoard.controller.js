"use strict";

(function(angular){
    angular.module("mainApp")
        .controller("winBoardCntl", function($scope, $http, Auth, $location, Win ,Socket, $uibModal){
            $scope.userProfile = false;
            var currentUser = Auth.getUser();
            console.log("current user in board : ", currentUser);
            var $grid = $(".grid").masonry({
                itemSelector : ".grid-item",
                columnWidth : 200,
                transitionDuration : "0.4s"
            });  
            $grid.imagesLoaded().progress(function(){
                $grid.masonry();
            });             
          //  $scope.wins = currentUser.wins;
            //io socket
            currentUser.$promise.then(function(currenUser){
                $scope.wins = currentUser.wins;
                Socket.syncRecentWins("win", $scope.wins, function(){
                    console.log("After socket chagne scope wins is : ", currentUser.wins);
                    
                });
              //  io.connect();
                $scope.deleteWin = function(win){
                    console.log("delete : ", win, currentUser);
                    if(win.creater == currentUser._id) { //creater can delete
                        console.log("Owner deleting");
                        Win.deleteWin(win._id, $scope.wins, function(){});
                    }else {
                        console.log("unreblogging");
                        Win.unreblog(currentUser._id, win._id, function(){
                            var index = -1;
                            for(var i = 0; i < $scope.wins.length; i++) {
                                if($scope.wins[i]._id == win._id) {
                                    index = i;
                                    break;
                                }
                            }
                            if(index != -1) {
                                $scope.wins.splice(index, 1);
                            }
                        });
                    }
                    
                };
                
                $scope.addWin = function(){
                    var modalInstance = $uibModal.open({
                        animation : true,
                        templateUrl : "/client/components/modal/modal.html",
                        controller : "modalCntl",
                        resolve : {
                            
                        }
                    });
                    
                    modalInstance.result.then(function(pin){
                        console.log(pin);
                        Win.createWin(pin.title, pin.srcurl, currentUser._id, function(){})
                    }, function(){
                        console.log("modal is dissmissed");
                    })
                }                
            });
        });
})(window.angular);