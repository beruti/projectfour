angular
// name of app
  .module('logging')
  // name of service - what is a service? 
  // a substitutable object that is wired together using a dependency injection
  // calling service on the angular app name as the module "logging"
  .service('myLocation', Location);
  // a service is self returning - it automatically creates an object for you to populate and returns it 
  // a factory does not create an object and thus you must make one yourself


function Location(){
  // automatically creates an empty object set as this
  // it also automatically returns this object
  // so ANYTHING That you attach to this you are attaching to the object being made by the service
  // in other words the service is an object which you will attach variables and methods to 

  var self  = this;
  // make empty geolocation variable
  self.geolocation = function(){
  if (navigator.geolocation) {
    console.log("navigator.geolocation exists")
    navigator.geolocation.getCurrentPosition(showPosition)
    }else{
      console.log("navigator geolocation does not exist")
    }
  }

  //self.geolocation = position;
  function showPosition(position){
    self.position = position.coords
    console.log('Got Location....')
    console.log(self.position)
  }

  self.geolocation()

  return self;

  
}

// you need a controller to use the service or factory object
// in the controller you include the factory or service object as a dependency
