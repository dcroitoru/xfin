var Reflux = require('reflux');
var request = require('superagent');
var AppActions = require('./AppActions');

var messages = ["miau"];
var movies = [];
var AppStore = Reflux.createStore({

	listenables: AppActions,
	onAddMessage: function (message) {
		messages.push(message);
		this.trigger({messages: messages});
	},
	onGetMovies: function () {
		request.get('http://xfinitytv.comcast.net/movie.widget')
			.end(function(err, res){
	    		movies = parseMovies(res.text);
	    		this.trigger({movies: movies});
			}.bind(this));
	},

	getInitialState: function () {
		return {messages: messages};
	},
	getMovies: function () {
		return {movies: movies};
	}, 
	onSelectMovie: function (movie) {
		console.log('should go to ', movie);
		
	},
});

module.exports = AppStore;


function parseMovies(data) {
    var anchor_REGEX = /<a[^>]*>([^<]+)<\/a>/g;
    var temp = data.match(anchor_REGEX).splice(0, 200);
    var result = [];
    //console.log(temp);
    temp.forEach(function (element) {
    	var r = 
        {
            url: /href="([^"]*)"/.exec(element)[1],
            id: /id="([^"]*)"/.exec(element)[1],
            title: /data-t="([^"]*)"/.exec(element)[1],
            videoId: /data-v="([^"]*)"/.exec(element)[1],
            popularity: 0,
        };

        var p = /data-pop="([^"]*)"/.exec(element);
        r.popularity = p && p[1];

        if (r.popularity > 100) 
        	result.push(r);
    });
    console.log('result is', result);

    return result;
}