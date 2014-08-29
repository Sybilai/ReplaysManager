var ws = require("ws").Server;
var Client = require("./client.js");
var index_socket = 0;

var Server = {
  server: undefined,
  clients: {},

  start: function( port ) {
    port = port || 8125;

    try {
      Server.server = new ws({port: port });
      Server.server.on("connection", Server.socket);
    } catch(e) {
      console.log(e);
    }
  },

  stop: function() {
  },

  socket: function(socket) {
    socket.id = ++index_socket;

    socket.on("message", function(data) {
      // TODO: try to parseJSON data
      var game, token;
      try {
        var aux = JSON.parse(data);
        game = aux.game;
        token = aux.token;
      } catch(e) {
        socket.destroy();
      }

      S.API.canAccessGame(game, token).then(
        function() {
          console.log("Vis", game, token);
          new Client(socket, game, token);
        },
        function() {
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
