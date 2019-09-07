"use strict";

(function(angular){
    angular.module("mainApp")
        .factory("Auth", function($cookieStore, User, $http, $q, $window){
            var currentUser = undefined;
            if($cookieStore.get("token")){
                currentUser = User.getMe();
                console.log("current in Auth user is  : ", currentUser);
            }
            
            return {
                "isLoggedin" : function(){
                    return (angular.isDefined(currentUser) && currentUser.hasOwnProperty("name") && $cookieStore.get("token"));
                },
                "isLoggedinSync" : function(cb){
                    if(!$cookieStore.get("token")) {
                        return cb(false);
                    }
                 //   console.log("curr ahaha : ", currentUser);
                    if(currentUser.hasOwnProperty("$promise")) {
                        currentUser.$promise
                            .then(function(user){
                             //   console.log(user)
                                if(!user) {
                                    return cb(false);
                                }
                                return cb(user);
                            });
                    }else {
                        return cb(angular.isDefined(currentUser.name));
                    }
                }, 
                
                "login" : function(email, pwd){
                    var deferred = $q.defer();
                   // console.log(email);
                    $http.post("/auth/local", {
                        email : email,
                        password : pwd
                    })
                        .then(function(result){
                            deferred.resolve(result.data);
                            if(!result.data.error){
                                currentUser = result.data.user;
                                $cookieStore.put("token", result.data.token);
                            }
                        })
                        .catch(function(err){
                            deferred.resolve({
                                error : err
                            });
                        });
                    return deferred.promise;
                },
                
                "signup" : function(email, password){
                    var deferred = $q.defer();
                    $http.post("/api/users", {
                        email : email,
                        password : password
                    }).then(function(res){
                        if(res.data.error) {
                            deferred.resolve(res.data);
                        }else {
                            currentUser = res.data.user;
                            $cookieStore.put("token", res.data.token);
                            deferred.resolve(res.data);
                        }
                    }).catch(function(err){
                        deferred.resolve({
                            error : err
                        });
                    });
                    return deferred.promise;
                }, 
                
                "changePwd" : function(oldpwd, newpwd) {
                    var deferred = $q.defer();
                    User.changePwd({id : currentUser._id}, {
                        oldPwd : oldpwd,
                        newPwd : newpwd
                    }).$promise.then(function(res){
                        if(!res.error) {
                            currentUser = res.user;
                        }
                        deferred.resolve(res);
                    }).catch(function(err){
                        deferred.resolve({
                            error : err
                        });
                    });
                    return deferred.promise;
                },
                
                "getUser" : function(){
                   // return User.getMe().$promise;?????
                   //return currentUser;
                  if($cookieStore.get("token")){
                    return User.getMe();
                  }else {
                      return null;
                  }
                }, 
                
                "logout" : function(){
                   // console.log("cao");
                    $cookieStore.remove("token");
                    $window.location.href = "/";
                }
            };
        })
})(window.angular);