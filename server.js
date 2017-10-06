// Import express and path modules.
var express = require( "express");
var path = require( "path");
// Create the express app.
var app = express();
// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));
// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// Root route to render the index.ejs view.
app.get('/', function(req, res) {
 res.render("index");
})
// Start Node server listening on port 8000.
app.post('/users',function(server, res){
    res.render('index')
})
var server = app.listen(8000, function() {
    console.log("listening on port 8000");
   });
   var io = require('socket.io').listen(server);
   io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    // all the server socket code goes in here
    socket.on( "posting_form", function (data){
        console.log(data.data);
        var response = data.data;
        var rando = Math.floor(Math.random()*1000) + 1;
    
        socket.emit( 'server_response', {response:response});
        socket.emit( 'lol', {response:rando});

    })
})

// If you don't know where this code is supposed to go reread the above info 
// Here is sample code for each different method:
// NOTE: we are just showing the emits, not any listeners.

// //  this is just the configuration code that we've already used
// io.sockets.on( 'connection', function (socket) {
//     //  EMIT:
//     socket.emit( 'my_emit_event');
//     //  BROADCAST:
//     socket.broadcast.emit( "my_broadcast_event");
//     //  FULL BROADCAST:
//     io.emit( "my_full_broadcast_event");
// })
