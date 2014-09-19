# CoderDojo - Start Node - Create a social network

This is an introduction to server side programming in Node.js and was created for CoderDojo members. The aim of this session is to create a social network in 2 hours! which we can then launch and sell for billions 

## Step 1 Install Node

Install Node from http://nodejs.org

## Step 2 Setup the project

Create the project folder 

````
mkdir coderdojo-start-node
````

Now create a folder called __public__, this is the folder whereyou will add the html, css and javascript code

````
cd coderdojo-start-node
mkdir public
````

## Install express 

__npm__ is Node Package Manager allows you to install Node Packages, to run a web server we are going to use a node package called __express__ will enable us to create a server easily that can accept web requests.

Now run 

````
npm install express
````

## Turn it into a social website and Install socket.io 

Socket.io is a technology that allows browsers to easily communicate with the server over streams.  

Now run 

````
npm install socket.io
````

## Now lets create our Node.js file

Now in the home directory __coderdojo-start-node__ save a new file called __app.js__.  Inside app.js add the following code

````
var express = require('express');
var app = express();


app.get('/coderdojo', function(req, res){
  res.send('Be cool');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

````
This code creates your first server and first http call

## Run your code

From inside directory __coderdojo-start-node__ open a command terminal and run 

````
node app

````
We are running __app__ because the file is called __app.js__

You should see the following output from this command

````
$ node app
Listening on port 3000
````

This is tell you that a server has started on your machine at port __3000__ 

You can stop the server at any time by running ````CTRL+C````

## Open your browser

Navigate to 

````
http://localhost:3000
````

You get an error right! But remember in your code you told the server to reference __/coderdojo__ so you need to navigate to

````
http://localhost:3000/coderdojo
````

Now see what happens 

## We now need update app.js to read your html code from the public folder

Update app.js with the following code

````javascript
var express = require('express');
var app = express();
var path = require('path');

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

var io = require('socket.io')(server);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/coderdojo', function(req, res){
  res.send('Be cool');
});

io.on('connection', function (socket) {
  console.log('emitting');
  socket.on('chat', function (data) {
  	console.log('emitting 2');
    console.log(data);
    socket.broadcast.emit('chat',  data);
  });
});
```` 

## Now add your html and css code


````html
<html>
	<head>
		<style rel="stylesheet" type="text/css">
			body {
				background: black;
				color: white;
				font-family: Tahoma;
			}

			h1 {
				color: pink;
			}

			div.code {
				width: 300px;
				padding: 5px;
				border: 1px solid black;
				background: lightgray;
				color: navy;
			}

			div.url {
				width: 300px;
				padding: 5px;
				border: 1px solid orange;
				background: navy;
				color: lightgray;
			}

			.input {
				color: gray;
				font-size: 15px;
				margin: 5px;
				vertical-align: top;
				width: 500px;
			}

			div.inputDiv {
				padding-left: 30px;
				width: 100%;
				color:pink;
			}

			button {
				background: green;
				padding: 10px;
				color: white;
				font-size: 12px;
				border: 1px solid white;
			}

			span.chatname {
				font-size: italic;
				color: red;
				font-size: 14px;
			}

			span.message {
				font-size: bold;
				color: gray;
				font-size: 18px;
			}
		</style>
	</head>
	<script src="jquery.js"></script>
	<script src="/socket.io/socket.io.js"></script>
	<script>
	  var socket = io.connect('http://192.168.1.239:3000');
	  
	  socket.on('chat', function (chatData) {
	    displayChat(chatData.name, chatData.chat);
	  });

	  function send() {
	  	var name = $("#name").val();
	  	var chat = $("#chat").val();
	  	socket.emit('chat', { name: name, chat: chat });
 		displayChat(name, chat);
	  }

	  function displayChat(from, message) {
	  	$( "#socialchat" ).prepend( "<div id='chatmessage'><span class='chatname'>"+from +" says "
	  	  + " </span><br/> " 
	  		+ "<span class='message'>"+message+"</span>"
	  		+"</div>" );
	  }
	</script>
	<body>
		<h1>CoderDojo Social Network</h1>
		<div class="inputDiv">
			<input id="name" type="text"  placeholder="name" class="input"></input>
		</div>
		<div class="inputDiv">
			<textarea rows="5" cols="50" id="chat" placeholder="chat here"  class="input"></textarea>
		</div>
		<div class="buttons">
			<button id="send" onclick="send()">Send</button>
		</div>
		<hr/>
		<h2>Social Chat</h2>
		<div id="socialchat"></div>
		
	</body>
</html>
````

Now open your browser and navigate to

```` 
http://localhost:3000 
````












