"use strict";


function onconnect(socket){
    console.log("new user is comming in");
    
    require("../api/wins/wins.socket.js").register(socket);
}

function ondisconnect(socket){
    console.log("use left the socket");
}

module.exports = function(io){
   // console.log(io);
    io.on("connection", function(socket){
       // console.log("new user is stepping in socket");
        socket.on("disconnect", function(){
            ondisconnect(socket);
        });
        
        onconnect(socket);
    });
}