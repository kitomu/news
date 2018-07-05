const config = require('./../config');
const   app = require('./app');
const socketioJwt = require('socketio-jwt'), // аутентификация по JWT для socket.io
socketIO = require('socket.io');

let io = socketIO(app);

io.use(socketioJwt.authorize({
  secret: config.SECRET_KEY,
  timeout: 15000
}));
io.use(function (socket) {
  
  console.log('Name: '+socket.decoded_token.displayName);
  
  socket.on("clientEvent", (data) => {
    console.log(data);
  })
});

const PORT = process.env.PORT || config.port;

const server =  app.listen(PORT , err => {
    if (err) console.error(err.message);
    console.log(`PORT: ${PORT}`);
  });

 

module.exports = server;