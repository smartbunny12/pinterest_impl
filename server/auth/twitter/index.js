"use strict";

var passport = require("passport");
var auth = require("../auth.service.js")();

module.exports = function(app){
    console.log("I am here!");
    app.get("/auth/twitter", passport.authenticate("twitter", {
        failureRedirect : "/signup",
        session : false
    }));
    
    app.get("/auth/twitter/callback", passport.authenticate("twitter", {
        failureRedirect : "/signup",
        session  :false
    }), auth.signTokenCookie);
};