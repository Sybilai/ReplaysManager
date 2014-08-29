Q = require("q");

var db_redis = require('./db_redis');
var http_server = require('./server_http_api');

var S = {
  API: require('./api.js'),
  db: new db_redis(),
  serverEnv: require('./server_environment'),
  serverVis: require('./server_visualizers'),
  serverAPI: new http_server()
};

module.exports = S;
