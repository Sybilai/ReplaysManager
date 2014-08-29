var http = require('http');

var Server = function() {
};

Server.prototype.start =
function() {
  var server = this;
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    var path = req.url.split('/');

    if (path[1] === "getGame" && path[2] != undefined && path[3] != undefined) {
      server.getGame(res, path[2], path[3]);
    } else {
      res.end();
    }
  }).listen(1337, '127.0.0.1');
};

Server.prototype.getGame =
function (res, token, game) {
  S.API.canAccessGame(game, token).then(
    function() {
      S.db.getGame(game, function(data) {
        if (data) res.end(JSON.stringify(data));
      });
    },
    function() {
      res.end();
    }
  );
}

module.exports = Server;
