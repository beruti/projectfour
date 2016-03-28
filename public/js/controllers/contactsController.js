angular
  .module('logging')
  .controller('ContactsController', ContactsController);

ContactsController.$inject = ["Contact", "User", "$state", "CurrentUser"];
//ContactsController.$inject = ["Contact", "User", "$state", "CurrentUser", '$scope', 'socket'];
//function ContactsController(Contact, User, $state, CurrentUser, $scope, socket){
function ContactsController(Contact, User, $state, CurrentUser){
  //console.log("contacts controller")
  var self = this;

  self.all      = [];
  self.users    = [];
  self.contact  = {};
  self.userContacts = {};
  self.currentUser = CurrentUser.getUser()

  self.getContacts = function(){
    Contact.query(function(data){
      self.all = data;
    });
  };

  self.getUserContacts = function(){
   var id = {id: self.currentUser._id}
    User.get(id, function(data){
      // console.log("hello")
      // console.log(data)
      self.userContacts = data.user.contacts
    })
  }
  console.log(self.currentUser._id);

  self.getUsers = function(){
    User.query(function(data){
       self.users = data;
    });
  };

  self.add = function(){
    // correspond to back end projectsCreate
    var user_id = self.currentUser._id
    // add user_id to project
    self.contact.user_id = user_id
    var contact = { contact: self.contact };
    //console.log("this is the " + {contact: self.contact});
    console.log("this is the contact " + contact)
    Contact.save(contact, function(data){
      self.all.push(data);
      self.contact = {};
      $state.go('contacts');
    });
  };

  self.getUserContacts();
  self.getUsers();
  //dont need to explicitly return self as is done automatically (but gonna anyway for piece of mind)
  return self;
}
