var Client = function(socket, token) {
  this.init(socket, token);
  S.serverVis.clients[this.token] = [];
  socket.write("success\n");
};

Client.prototype.init =
function(socket, token) {
  var client = this;
  this.id = socket.id;
  this.socket = socket;
  this.token = token.substr(0, token.length-2);

  this.socket.removeAllListeners("close");
  this.socket.removeAllListeners("error");
  this.socket.removeAllListeners("data");

  this.socket.on("data", function(data) {
    client.ondata(data);
  });

  this.socket.on("close", function() {
    console.log("environment disconnected", client.id);
  });

  this.socket.on("error", function(ex) {
    console.log("client error", client.id, ex);
  });
};

Client.prototype.ondata =
function(data) {
  data = data.toString();
  S.db.newMessage(this.token, data);

  for (var i = 0, l = S.serverVis.clients[this.token].length; i < l; ++i) {
    var v = S.serverVis.clients[this.token][i].socket;
    try {
      v.send(data);
    } catch(e) {
      console.log("Error!");
    }
  }
};

module.exports = Client;
