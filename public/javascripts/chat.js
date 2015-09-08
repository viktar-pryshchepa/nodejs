window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://10.6.187.150:8080');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("chat");
    var name = document.getElementById("name");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
			var div = document.createElement("div");
			div.innerHTML = '<b>' + (data.username ? data.username : 'Server')  + '</b>: ' + data.message;
			$('#chat').append(div);
			content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem: ", data);
        }
    });
 
    sendButton.onclick = function() {
	    if(name.value == "") {
            alert("Please type your name!");
        } else {
           var text = field.value;
		field.value = '';
        socket.emit('send', {message: text, username: name.value});
		 }
           
        
    };
 
	$(document).ready(function() {
		$("#field").keyup(function(e) {
			if(e.keyCode == 13) {
				sendButton.click();
			}
		});
	});
}