angular
  .module('logging')
  .controller('UsersController', UsersController);
  

// Here we inject the currentUser service to access the current user
UsersController.$inject = ['User', 'TokenService', '$state', 'CurrentUser', 'myLocation'];
function UsersController(User, TokenService, $state, CurrentUser, myLocation){

  var self = this;

  self.all           = [];
  self.user          = {};
  self.formdata      = {};
  self.error         = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;
  self.checkLocation = checkLocation;
  self.deleteUser    = deleteUser;
  self.editUser      = editUser;
  // empty object to be populated with data
  self.usersTotalContacts  = {};
  self.checkForUserContacts = checkForUserContacts;
  self.currentUser = CurrentUser.getUser()

  function getUsers() {
    User.query(function(data){
      //console.log(data)
      self.all = data;
    });
  }

  // called at bottom of page
  function checkForUserContacts(){
    // id is this objects current user and their id
   var id = {id: self.currentUser._id}
    // user is found in database and all their data is retrieved with a get request
    User.get(id, function(data){
      console.log(data.user)
      // usersTotalContacts are found by going into the data object and pulling out the user property and its contacts
      self.userInfo = data.user;
      })
    console.log("this is outside " + self.userInfo)
  }

  console.log(self.usersTotalContacts)

  function handleLogin(res) {
    console.log("give them a token!")
    var token = res.token ? res.token : null;
    if (token) {
      self.getUsers(); // calling get Users
      $state.go('home'); // changing state to home
    }
    self.user = TokenService.decodeToken();
    CurrentUser.saveUser(self.user);
  }

  function handleError(e) {
    console.log("handle Error like")
    self.error = "Something went wrong.";
  }

  function register() {
    console.log("hitting register...atleast")
    self.error = null;
    User.register(self.user, handleLogin, handleError);
    //console.log(User)
    // may be going to different server now
    // issue may be caused by /api route extension in app.js
    console.log("this is self.user email "+ self.user.email)
  }

  function login() {
    self.error = null;
    User.login(self.user, handleLogin, handleError);
    //load_socket()
  }

  function logout() {
    TokenService.removeToken();
    self.all  = [];
    self.user = {};
    CurrentUser.clearUser();
    location.href="/"
  }

  function checkLoggedIn() {
    //console.log("on profile page") irrelevant as this is on so many pages
    var loggedIn = !!TokenService.getToken();
    return loggedIn;
    // The URL of your web server (the port is set in app.js)
    //var socket = io.connect(url);
  }

  if (!!CurrentUser.getUser()) {
    self.user = CurrentUser.getUser();
    self.getUsers();
  }

  function checkLocation(){
    //Location is an object so you can ask for a variable or function stored within it
    // console.log("this is the geolocation function being called in the usersController on the Location service " + Location.geolocation())
    self.myLocation = myLocation.position
    console.log("connecting to room "+ myLocation.position)
  }

  function deleteUser(){
    console.log("start making delete user function")
    console.log(self.user._id)
     $.ajax({
        url: "http://localhost:3000/api/users/" + self.user._id,
        type: 'delete'
        //beforeSend: setRequestHeader
    }).done(function(data){
      console.log("ajax request complete")
      logout()
    })
  }

  function editUser(data){
    console.log("start edit user function")
    console.log(self.user.local.email)
    // console.log(data.users.user.local.email)
    // console.log({{users.user.local.email}})
    // need to get out the innerHTML value
    //console.log($("#useremail").val())
     var user = {
     user:{ 
      local:{
      email: self.user.local.email
      }
     }
    }
  //console.log(user.user.userdata.email)
     $.ajax({
         url: "http://localhost:3000/api/users/" + self.user._id,
         type: 'patch',
         data: user.user
     }).done(function(data){
       console.log("ajax request complete")
     })
    // // nothing in the value
    // is only in the scope
  }

  //attach $scope.apply whenever you emit an event

  self.checkForUserContacts();
  return self;
}
