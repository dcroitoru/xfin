var React = require('react');
var router = require('react-router');
var request = require('superagent');
var Remote = require('../Remote');
var MovieDetails = require('./MovieDetails');
var SimilarMovies = require('./SimilarMovies');
var MovieCast = require('./MovieCast');



function getBackdrop(title) {
	return '';
}

var theid;
var MovieDetailsView = React.createClass({
	contextTypes: {
    	router: React.PropTypes.func
  	},
  	getSummary: function (id) {
		request.get(Remote.tmdb + '/movie/' + id + '?api_key=' + Remote.api_key)
		.end(function (err, res) {
			console.log(res.body);
			this.setState({
				summary: res.body,
				backdrop: Remote.backdrop(res.body),
				poster: Remote.poster(res.body)
			});
		}.bind(this));
	},

	getSimilar: function (id) {
		request.get(Remote.tmdb + '/movie/' + id + '/similar?api_key=' + Remote.api_key)
		.end(function (err, res) {
			console.log('similar', res.body);
			this.setState({
				similar: res.body.results.splice(0, 8)
			});
		}.bind(this));
	},
	getCredits: function (id) {
		request.get(Remote.tmdb + '/movie/' + id + '/credits?api_key=' + Remote.api_key)
		.end(function (err, res) {
			console.log('credits', res.body);
			this.setState({
				credits: res.body.cast.splice(0, 8)
			});
		}.bind(this));
	},
	
  	getInitialState: function() {
  		return {
  			summary: null
  		};
  	},
  	componentDidMount: function() {
  		theid = this.context.router.getCurrentParams().id;
		this.getSummary(theid);
		this.getSimilar(theid);
		this.getCredits(theid);
  	},
  	componentWillUpdate: function(nextProps, nextState) {
  		console.log('component will update', this.context.router.getCurrentParams().id);
  		if(this.context.router.getCurrentParams().id != theid) {
  			this.setState({summary: null, similar: null});
  			theid = this.context.router.getCurrentParams().id;
			this.getSummary(theid);
			this.getSimilar(theid);
  		}
  	},
  	render: function() {

		return (
			<div className="innerMainWrapper">
			{this.state.summary 
				? <MovieDetails summary={this.state.summary} backdrop={this.state.backdrop} poster={this.state.poster}/>
				: <span>loading...</span>
			}
			{this.state.credits
				? <MovieCast cast={this.state.credits}/>
				: <span>loading...</span>
			}
			{this.state.similar
				? <SimilarMovies similar={this.state.similar} />
				: <span>loading...</span>
			}
			
			</div>
		);
	}

});

module.exports = MovieDetailsView;


/*
getBackdrop: function (title) {
		request.get('http://api.themoviedb.org/3/search/movie?api_key=095eaae6f523d439868754b7c4086b72&query=' + title)
		.end(function (err, res) {
			console.log(res.body);
			if(!err) {
				this.setState({
					backdrop: 'http://image.tmdb.org/t/p/w1280' + res.body.results[0].backdrop_path,
					poster: 'http://image.tmdb.org/t/p/w150' + res.body.results[0].poster_path,
				});
			}
		}.bind(this));
		
	},*/

	  	/*getSummary: function (id) {
		//http://xfinitytv.comcast.net/api/video/summary/6613510517591897112
		request.get('http://xfinitytv.comcast.net/api/video/summary/' + id)
		.end(function (err, res) {
			console.log(res.body);
			this.setState({summary: res.body});
			this.getBackdrop(res.body.name)
		}.bind(this));
	},*/