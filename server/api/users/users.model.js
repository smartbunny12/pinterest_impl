"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Wins = require("../wins/wins.model.js");

var userSchema = new Schema({
    "name" : String,
    "email" : String,
    "password" : String,
    "wins" : [{type : Schema.Types.ObjectId, ref : "Win"}],
    "liked" : [{type : Schema.Types.ObjectId, ref : "Win"}],
    "twitter" : {
        
    }
});

module.exports = mongoose.model("User", userSchema);