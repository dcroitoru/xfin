var Reflux = require('reflux');

var AppActions = Reflux.createActions(['addMessage', 'getMovies', 'getTv', 'getSports', 'selectMovie']);

module.exports = AppActions;