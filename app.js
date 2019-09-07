var express = require("express"),
    dotenv = require("dotenv"),
    mongoose = require("mongoose");
    

dotenv.load();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/pinterest");

var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

require("./server/config/express.js")(app);
require("./server/config/socketio.js")(io);
require("./routes.js")(app);


server.listen(process.env.PORT || 8080, function(){
  console.log("express server is listening on port : " + process.env.PORT || 8080);
});

    