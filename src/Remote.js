var ak = '095eaae6f523d439868754b7c4086b72';

module.exports = {
	api_key: ak,
	tmdb: 'http://api.themoviedb.org/3',
	backdrop: function (obj) {
		return "http://image.tmdb.org/t/p/w1280/"+obj.backdrop_path;
	},
	poster: function (obj) {
		return "http://image.tmdb.org/t/p/w150/"+obj.poster_path;
	}
};