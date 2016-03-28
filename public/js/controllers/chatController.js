// when only the name of the module is passed as an argument (without array of dependencies) the 'module' method returns the specified module 
angular
  .module('logging')
  .controller('ChatController', ChatController);

//inject dependencies
 ChatController.$inject = ["Contact", "User", "$state", "CurrentUser", '$scope', 'socket', 'TokenService'];
 // capitalise name of function as it is a constructor function
 function ChatController(Contact, User, $state, CurrentUser, $scope, socket, TokenService){
 	console.log("chat controller")
 	// using controllerAs syntax so this equates to $scope
 	// self is set to this and used to avoid scope confusion
 	// this refers to the ChatController object that is returned when created
 	var self = this;


 	//console.log("hello")
 	//make array to store chat messages
 	self.messages  = [];
 	self.beginchat = beginchat;
 	self.textinput = "";
 	self.userEmail  = "";
 	self.joinRoom  = joinRoom;
 	self.userEmails = [];
 	self.getUserEmail = getUserEmail;


 	function getUserEmail(res){
 		var usertoken = TokenService.decodeToken();
 		console.log(usertoken.local.email)
 		self.userEmail = usertoken.local.email
 		//CurrentUser.saveUser(self.user);
 	}

 	getUserEmail();

 	function beginchat(){

 		// where does it emit on connection?
 		// does so automatically in factory when sets var socket = io()

 		//stop submit and refresh 
 		event.preventDefault();
 		//make message variable
 		var newmessage = {message: self.textinput,
 						  userEmail	 : self.userEmail }
 		// emit event called "message", pass it object newMessage
 		socket.emit("message", newmessage);
 		//console.log(messages)
 		//clear input form
 		self.textinput = "";
 		//listen for changes
 		//$scope.$apply();
 	}

 	// listen for io event
 	socket.on('received', function(message){
 		self.messages.push(message)
 		$scope.$apply();
 	})

 	function joinRoom() {
	//function joinRoom(position) {
 		// establishing join-room
 	 //    var x = Math.round(position.coords.latitude * 10000) / 10000; 
 	 //    var y = Math.round(position.coords.longitude * 10000) / 10000;
 		// var room = String(x)+String(y);
 		var room = ("chatroom")
 		socket.emit('join-room', room);	
 		console.log("room joined")
 		//$scope.$apply();
 	}

 	// getLocation();

 	// function getLocation() {
 	//     if (navigator.geolocation) {
 	//         navigator.geolocation.getCurrentPosition(joinRoom);
 	//     } else {
 	//         x.innerHTML = "Geolocation is not supported by this browser.";
 	//     }
 	// }





 	//dont need to explicitly return self as is done automatically (but gonna anyway for piece of mind)
 	return self;

  }