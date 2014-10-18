var express = require('express');
var app = express();
var path = require('path');

// Bring up a HTTP Server on port 3000.
var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});
var io = require('socket.io')(server);

app.get('/coderdojo', function(req, res){
    res.send('Be cool');
});

// Serve the public directory as root.
app.use(express.static(path.join(__dirname, 'public')));

// Wait for connections.
io.on('connection', function (socket) {

    // when a connection emits a 'chat' signal.
    socket.on('chat', function (data) {

        // broadcast their message to all connections.
        socket.broadcast.emit('chat', data);
    });
});