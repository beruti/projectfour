// generic data structure specified for sake of abstraction
// app.factory('socket', function ($rootScope) {
//   var socket = io.connect();
//   return {
//     on: function (eventName, callback) {
//       socket.on(eventName, function () {  
//         var args = arguments;
//         $rootScope.$apply(function () {
//           callback.apply(socket, args);
//         });
//       });
//     },
//     emit: function (eventName, data, callback) {
//       socket.emit(eventName, data, function () {
//         var args = arguments;
//         $rootScope.$apply(function () {
//           if (callback) {
//             callback.apply(socket, args);
//           }
//         });
//       })
//     }
//   };
// });

// suggested service from tutorial - overcomplication
// using Factory instead

angular
  .module('logging')
  .factory('socket', socket);

function socket(){
  var socket = io();

  return socket;
}

// should no longer have to have connection script in html if done right