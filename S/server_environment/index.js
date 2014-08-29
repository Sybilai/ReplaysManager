var net = require("net");
var Client = require("./client.js");
var index_socket = 0;

var Server = {
  server: undefined,

  start: function( port ) {
    port = port || 8124;

    try {
      Server.server = net.createServer( Server.socket ).listen( port );
    } catch(e) {
      console.log(e);
    }
  },

  stop: function() {
  },

  socket: function(socket) {
    socket.id = ++index_socket;

    socket.on("data", function(data) {
      data = data.toString();
      S.API.checkToken(data).then(
        function(res) {
          console.log("Env", data);
          new Client(socket, data);
        },
        function() {
          // TODO: Send invalid message
          socket.destroy();
        }
      );
    });

    socket.on("close", function() {
      console.log("socket close", socket.id);
    });

    socket.on("error", function(ex) {
      console.log("socket error", socket.id, ex);
    });
  }

};

module.exports = Server;
