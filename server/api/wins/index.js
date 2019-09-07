"use strict";

var cntlClass = require("./wins.controllers.js");
var auth = require("../../auth/auth.service.js")();

module.exports = function(app){
    var cntl = new cntlClass();
    
    //wins api
    app.get("/api/wins/recent", cntl.getRecent);
    app.get("/api/wins/popular", cntl.getPopular)
    app.get("/api/wins/:id", auth.isAuthenticated(), cntl.getWin);
    app.delete("/api/wins/:id", auth.isAuthenticated(), cntl.deleteWin);
    app.post("/api/wins/like/:id", auth.isAuthenticated(), cntl.likeWin);
    app.post("/api/wins/reblog/:id", auth.isAuthenticated(), cntl.reblogWin);
    app.post("/api/wins", auth.isAuthenticated(), cntl.createWin);
    app.post("/api/wins/unreblog/:id", auth.isAuthenticated(), cntl.unreblog);
}