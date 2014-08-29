S = require("./S");

S.db.start();
S.serverEnv.start( 8124 );
S.serverVis.start( 8125 );
S.serverAPI.start();

// TODO: implement API
// TODO: when environment closes, close all visualizers and clean data
// TODO: when visualizer closes, delete it
// TODO: make redis persistent
// TODO: make redis faster with hewredis or w/e
