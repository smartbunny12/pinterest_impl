"use strict";

var cntlClass  = require("./users.controllers.js");
var auth = require("../../auth/auth.service.js")();

module.exports = function(app) {
    var cntl = new cntlClass(app);
    
    app.get("/api/users", auth.isAuthenticated(), cntl.getAllUsers);
    app.get("/api/users/me", auth.isAuthenticated(), cntl.getMe)
    app.get("/api/users/:id", auth.isAuthenticated(), cntl.getUser);
    app.delete("/api/users/:id", auth.isAuthenticated(), cntl.deleteUser);
    app.post("/api/users", cntl.createUser);
    app.put("/api/users/:id", auth.isAuthenticated(), cntl.changePwd);
}