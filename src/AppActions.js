var Reflux = require('reflux');

var AppActions = Reflux.createActions(['addMessage', 'getMovies', 'getTv', 'getSports', 'getLiveTv', 'selectMovie']);

module.exports = AppActions;