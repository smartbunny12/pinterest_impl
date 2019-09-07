"use strcit";

var Wins = require("./wins.model.js");

exports.register = function(socket){
    Wins.schema.post("save", function(doc){
        console.log("Win is saving : ", doc);
        socket.emit("win:save", doc);
    });
    
    Wins.schema.post("remove", function(doc){
       socket.emit("win:remove", doc); 
    });
};