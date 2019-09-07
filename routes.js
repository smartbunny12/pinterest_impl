"use strict";

module.exports = function(app){
    //api routes
    require("./server/api/wins")(app);
    require("./server/api/users")(app);
    
    //auth routes
    require("./server/auth")(app);
    app.get("/*", function(req, res, next){
        return res.sendfile("./client/index.html");
    });
    
};


