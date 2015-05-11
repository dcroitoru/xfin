var Reflux = require('reflux');
var request = require('superagent');
var AppActions = require('./AppActions');
var Remote = require('./Remote');

//var api_key = '095eaae6f523d439868754b7c4086b72';
var messages = ["miau"];
var movies = [];
var tv = [];
var AppStore = Reflux.createStore({

	listenables: AppActions,
	onAddMessage: function (message) {
		messages.push(message);
		this.trigger({messages: messages});
	},
	/*onGetMovies: function () {
		request.get('http://xfinitytv.comcast.net/movie.widget')
			.end(function(err, res){
	    		movies = parseMovies(res.text);
	    		this.trigger({movies: movies});
			}.bind(this));
	},*/
	onGetMovies: function () {
		request.get('http://api.themoviedb.org/3/movie/popular', {api_key: Remote.api_key})
			.end(function(err, res){
	    		movies = res.body.results;
	    		this.trigger({movies: movies});
			}.bind(this));
	},

	onGetTv: function () {
		request.get('http://api.themoviedb.org/3/tv/popular', {api_key: Remote.api_key})
			.end(function(err, res){
	    		tv = res.body.results;
	    		this.trigger({tv: tv});
			}.bind(this));
	},

	onGetSports: function () {
		request.get('http://xfinitytv.comcast.net/microsite/sports')
			.end(function(err, res){
	    		sports = parseSports(res.text);
	    		console.log(sports);
	    		this.trigger({sports: sports});
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

function parseSports(html) {
	//console.log('parsing sports', html);
	var ret = [];
	var section_REGEX = /<nav[^>]*>([^<]+)<\/nav>/g;
	var nav_REGEX = /<section id="featured-events"[^>]*>(.|\n)*?<\/section>?/g;
	var ul_REGEX = /<ul class="carousel-items"[^>]*>(.|\n)*?<\/ul>?/g;
	var li_re = /<li[^>]*>(.|\n)*?<\/li>?/g;
	//var nav_REGEX = /<nav>(.|\n)*?<\/nav>/
	var temp = html.match(nav_REGEX);
	var a1 = ul_REGEX.exec(temp[0]);
	var a2 = a1[0].match(li_re);
	console.log(a2);

	a2.forEach(function (element) {
    	var r = 
        {
            url: /<div class="content">(.|\n)*? data-src="([^"]*)"?/.exec(element)[2],
            id: /data-resource-id="([^"]*)"/.exec(element)[1]            
        };

        ret.push(r);
    });

    return (ret);
}