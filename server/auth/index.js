"use strict";

var local = require("./local/passport.js");
var twitter = require("./twitter/passport.js");

module.exports = function(app){
    //passport setup
    local.setup();
    twitter.setup();
    
    //auth routing
    require("./local")(app);
    require("./twitter")(app);
};