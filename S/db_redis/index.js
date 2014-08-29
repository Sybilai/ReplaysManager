var redis = require("redis");

var DB = function() {
};

DB.prototype.start =
function(path) {
  this.client = redis.createClient();

  this.client.on("error", function (err) {
    console.log("Error " + err);
  });
};

DB.prototype.newMessage =
function(game, message) {
  this.client.rpush(game, message, redis.print);
};

DB.prototype.getGame =
function(game, callback) {
  var client = this.client;

  client.llen(game, function(err, len) {
    client.lrange(game, 0, len, function(err, replies) {
      callback(JSON.stringify(replies));
    });

  });
};

module.exports = DB;
