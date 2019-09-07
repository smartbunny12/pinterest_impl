"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    User = require("../users/users.model.js");

var winSchema = new Schema({
    title : String,
    hearts : {type : Number, default: 0},
    reblogs : {type : Number, default : 0},
    creater : {type : Schema.Types.ObjectId, ref : "User"},
    timeStamp : {type: Date}, 
    picUrl : {type : String}
});

winSchema.methods.liking =  function(cb){// methods name don't conflict with type name
    this.hearts++;
    this.save(function(err, win){
        if(err) {
            return cb(err, null);
        }else {
            return cb(null, win);
        }
    });
};

winSchema.methods.rebloging = function(cb){
    this.reblogs++;
    this.save(function(err, win){
        if(err){
            return cb(err, null);
        }else {
            return cb(null, win);
        }
    })
};

module.exports = mongoose.model("Win", winSchema);