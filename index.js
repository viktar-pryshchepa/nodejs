var express = require("express");
 path = require('path');
var app = express();
var port = 3720;
app.use(express.static(path.join(__dirname, 'public')));
 app.set('view engine', 'jade');
app.get("/", function(req, res){
	res.render('index', {
       title: 'CHAT',
     });
});
var io = require('socket.io').listen(app.listen(port));
var $ = require('JQuery');
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
	    data.message = escapeHtml(data.message);
		 data.username = escapeHtml(data.username);
		
        io.sockets.emit('message', data);
    });
});
console.log("Listening on port " + port);


function escapeHtml(unsafe) {
  return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}