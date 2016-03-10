angular
  .module('logging')
  .factory('socket', socket);

function socket(){
  var socket = io();

  return socket;
}

// should no longer have to have connection script in html if done right