"use strict";

(function(angular){ // define augular top level and include all providers
    angular.module("mainApp", ["ui.router", "ngCookies", "ui.bootstrap", "ngResource"])
        .run(function($rootScope, Auth, $state, $location){
            $rootScope.$on("$stateChangeStart", function(event, next){
                Auth.isLoggedinSync(function(isLoggedin){
                    if(next.authenticate && !isLoggedin) {
                        $location.path("/login");
                    }
                });
            });
        })
        .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
            $urlRouterProvider.otherwise("/");
            $locationProvider.html5Mode(true);
            $httpProvider.interceptors.push("AuthInterceptor");
        })
        .factory("AuthInterceptor", function($q, $cookieStore, $location){
            return {
                "request": function(config){
                    config.headers = config.headers || {};
                    if($cookieStore.get("token")) {
                        config.headers.Authorization = "Bearer " + $cookieStore.get("token");
                    }
                    return config;
                },
                
                "responseError" : function(response){
                    if(response.status == "401"){
                        $cookieStore.remove("token");
                        $location.path("/login");
                        return $q.reject(response);
                    } else {
                        return $q.reject(response);
                    }
                }
            };
        });
})(window.angular);