"use strict";

(function(angular){
    angular.module('mainApp')
        .directive("myFooter", function(){
            return {
                templateUrl : "/client/components/footer/footer.html",
                controller : "footCntl",
                scope:[]
            }
        })
        .controller("footCntl", function(){
            
        });
})(window.angular);