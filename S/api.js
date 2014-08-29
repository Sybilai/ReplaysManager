var API = {
  checkToken: function( token ) {
    var deferred = Q.defer();

    setTimeout(function() {
      deferred.resolve();
    }, 10);

    return deferred.promise;
  },

  canAccessGame: function( game, token ) {
    var deferred = Q.defer();

    setTimeout(function() {
      deferred.resolve();
    }, 10);

    return deferred.promise;
  }
};

module.exports = API;
