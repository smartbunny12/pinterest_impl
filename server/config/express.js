"use strict";

var bodyParser = require("body-parser"),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    express = require("express");

module.exports = function(app){
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
        secret : process.env.SESSION_SECRET,
        resave : true,
        saveUninitialized: true
    }));
    
    app.use("/client", express.static(process.cwd() + "/client"));
    app.use("/public", express.static(process.cwd() + "/public"));
    app.use('/node_modules', express.static(process.cwd() + "/node_modules"));
}