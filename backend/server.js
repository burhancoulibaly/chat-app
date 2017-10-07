var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');

users = [];
connections = [];

resolvedPath = path.resolve('./src/html/app.html');
styles = path.resolve("./src/styles");
js = path.resolve("./src/js");
bootstrap = path.resolve("./node_modules/bootstrap/dist/css");
jquery = path.resolve("./node_modules/jquery/dist");
socketIO = path.resolve("./socket.io")

app.use("/styles", express.static(styles));
app.use("/js", express.static(js));
app.use("/bootstrap", express.static(bootstrap));
app.use("/jquery", express.static(jquery));
app.use("/socketIO", express.static(socketIO))

server.listen(process.env.PORT || 3000);
console.log('Server running on port 3000');

app.get('/',function(req,res){
  res.sendFile(resolvedPath);
});



io.sockets.on('connection', (socket)=>{
  //Connections
  connections.push(socket);
  console.log('New Connection: %s sockets connected', connections.length);

  //Disconnections
  socket.on('disconnect',(data)=>{
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log('Connection Loss: %s sockets connected', connections.length);
  });

  //Send message
  socket.on('send message', function(data){
    io.sockets.emit('new message', {msg:data, user:socket.username});
  });

  //New user
  socket.on('new user', function(data,callback){
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateUsernames();
  })
});

function updateUsernames(){
  io.sockets.emit('get users', users);
}
