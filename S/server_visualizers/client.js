var Client = function(socket, game, token) {
  this.init(socket, game, token);
  S.serverVis.clients[game].push(this);
  this.sendGame();
};

Client.prototype.init =
function(socket, game, token) {
  var client = this;
  this.id = socket.id;
  this.socket = socket;
  this.game = game;
  this.token = token;

  this.socket.removeAllListeners("close");
  this.socket.removeAllListeners("error");
  this.socket.removeAllListeners("data");

  this.socket.on("close", function() {
    console.log("environment disconnected", client.id);
  });

  this.socket.on("error", function(ex) {
    console.log("client error", client.id, ex);
  });
};

Client.prototype.sendGame = function() {
  (function(client) {
    S.db.getGame(client.game, function(res) {
      client.socket.send(res + '\n');
    });
  })(this);
}

module.exports = Client;
