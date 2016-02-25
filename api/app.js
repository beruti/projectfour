//THIS IS THE MIDDLEWARE FILE - every response and request is run through this file

//----------NPMS
// node framework 
var express        = require('express');
// cross origin resource sharing - makes use of localStorage and thus may be necessary for jwt as token is stored here
var cors           = require('cors');
// utilities for handling and transforming file paths
var path           = require('path');
// error logger
var morgan         = require('morgan');
// json interpreter
var bodyParser     = require('body-parser');
// object document model interpreter - provides means to speak to mongo database
var mongoose       = require('mongoose');
// authentication ware - for encrypting password
var passport       = require('passport');
// cookie interpreter/deconstructor = should not be needed here
var cookieParser   = require("cookie-parser");
// helps pass over get/post and expand http requests - allowing hidden methods on forms - methodOverride will interpret these hidden methods on back end
var methodOverride = require("method-override");
// is passed in header of all requests
var jwt            = require('jsonwebtoken');
// jwt specific to the express framework
var expressJWT     = require('express-jwt');
// app variable to inherit express framework
var app = express();
// used to store authenticated and encrypted user and grant access to certain areas of site that require a jwt
var port        = process.env.PORT || 3000;

var http        = require('http').createServer(app)
var io          = require('socket.io')(http);
//
//
// ------------INTERNAL

var config         = require('./config/config');
// using model that is abstracted in models folder
var User           = require('./models/user');
// using secret variable that is abstracted in config - is key element in creating json web token
var secret         = require('./config/config').secret;

//----------------------------------MIDDLEWARE DEFINED, NOW HAVE TO STATE WHICH TO USE----------------------

// connect to database (config.database = mongodb://localhost:27017/passport-and-jwts)
mongoose.connect(config.database);

 // app.get('/#/chat', function(req, res){
 //   res.sendfile(__dirname + '/chat.html');
 // });

 // connect to socket io object and require socket object as argument
 // io.on('connection', function(socket){
 //  // all server side methods can be written in here
 //  //what is emitted needs to be listened for on client side and then reacted to if heard
 //   console.log('a user connected');
 //   socket.on('disconnect', function(){
 //       console.log('user disconnected');
 //     });

 //   socket.on('hellofromclientside', function(msg){
 //     console.log('message from client?or how do you differentiate: ' + msg);
 //     io.emit('hellofromserverside', msg);
 //   });

 //   // socket.on('hellooutthere', function(response){
 //   //  console.log("this is the response " + response)
 //   //  io.emit("imhereinapp.js", response)
 //   // })

 //   // 
 //   // socket.join('default')

 //   // console.log("user connected")

 //   // socket.on('hello out there',function(){
 //   //  io.sockets.in('default').emit('im here');
 //   // })

 // });
// all connected
io.on('connection', function(socket){
  // is now listening for connection event
  //on connection event call function that takes socket as argument
  console.log("new socket connected")
  //trying to join chatroom - how to check - docs
  //socket.join("chatroom");

  socket.on('message' , function(message){
    console.log("message heard")
    console.log(message)

    io.emit('received', message)

  });

  // socket.on('join-room', function(room){
  //   socket.join(room)
  //   console.log("this is the socket "+ room)
  // } )
})

// requiring passport
require('./config/passport')(passport);

// use methodOvveride as middleware
app.use(methodOverride(function(req, res){
  // if there is an object in the body of the request and the typeof the request.body is an object and there is a hidden method denoted by _method THEN execute the middleware 
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    //set the method to the method defined by the hidden method _method
    var method = req.body._method
    // clear the req.body._method so as to avoid processing hidden method twice
    delete req.body._method
    // return the method - ie the hidden method - so that is can be passed as the method to use for http verb
    return method
  }
}));

//translate req.body to json format
app.use(bodyParser.json());
// url encode req.body
app.use(bodyParser.urlencoded({ extended: true }));
// use cookieParser
app.use(cookieParser());
// use error logger and specify developer environment
app.use(morgan('dev'));
// use CORS
app.use(cors());
// necessary to start passport technology (would need .sessions is using sessions too)
app.use(passport.initialize());
//use public folder(ie the front end)
app.use(express.static(path.join(__dirname, 'public')));
//set port up
app.set('port', process.env.PORT || 3000);

//--------RESTRICTING ROUTES BASED ON JWT
//restrict all routes to require a jwt token except for login and register which the user is allowed to post to to sign up/login
app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      // { url: '/login', methods: ['POST'] },
      // { url: '/register', methods: ['POST'] },
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  }));

// error handling middleware - will give error object if error occurs
app.use(function (err, req, res, next) {
  //if error object name is equal to unauthorized error then execute..
  if (err.name === 'UnauthorizedError') {
    // return status 401 if unauthorized error and send a json message saying unauthorized request - will show in terminal
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  // cycle to next request,response
  next();
});

// include routes that are abstracted in config/routes
var routes = require('./config/routes');
// use api on the front of all routes
app.use("/api", routes);

// send the element hello world in h1 header tag
// app.get('/', function(request,response){
//   // we could write ALL of our html in here if we wanted 
//   // but better to abstract into an external html file
//   //response.send('<h1>Hello world</h1>');
//   //REFACTOR
//   // send all html from file path below
//   response.sendFile(__dirname + '../front-end/js/views/home.html');
// })

//app.listen(3000)



 http.listen(port)
 console.log('Server started on port ' + port + '…')


