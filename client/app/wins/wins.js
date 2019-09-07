"use strict";

(function(angular){
    angular.module("mainApp")
        .config(function($stateProvider){
            $stateProvider.state("recentBoard", {
                url : "/recentBoard",
                templateUrl : "/client/app/wins/recentwinboard/recentBoard.html",
                controller : "recentBoardCntl", 
                resolve : {
                    recentWins : function($http, $q){
                        var deferred = $q.defer();
                        $http.get("/api/wins/recent")
                            .then(function(res){
                                deferred.resolve(res.data);
                            })
                            .catch(function(err){
                                throw err;
                            });
                        return deferred.promise;
                    }
                }
            }).state("userBoard", {
                url : "/userboard/:id",
                templateUrl : "/client/app/wins/userwinboard/userBoard.html",
                controller : "userBoardCntl",
                resolve: {
                    targetUser : function($stateParams, User){
                        return User.getUser({id : $stateParams.id}).$promise;
                    }
                }
            }).state("winBoard", {
                url : "/winBoard",
                templateUrl : "/client/app/wins/userwinboard/userBoard.html",
                controller : "winBoardCntl",
                authenticate : true
            });
        });
})(window.angular);