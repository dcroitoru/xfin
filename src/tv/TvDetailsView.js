var React = require('react');
var request = require('superagent');
var Remote = require('../Remote');

var MovieDetails = require('../movies/MovieDetails');
var MovieCast = require('../movies/MovieCast');
var SimilarTv = require('./SimilarTv');

var theid;
var TvDetailsView = React.createClass({
	contextTypes: {
    	router: React.PropTypes.func
  	},
  	getSummary: function (id) {
		request.get(Remote.tmdb + '/tv/' + id + '?api_key=' + Remote.api_key)
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
		request.get(Remote.tmdb + '/tv/' + id + '/similar?api_key=' + Remote.api_key)
		.end(function (err, res) {
			console.log('similar', res.body);
			this.setState({
				similar: res.body.results.splice(0, 8)
			});
		}.bind(this));
	},
	getCredits: function (id) {
		request.get(Remote.tmdb + '/tv/' + id + '/credits?api_key=' + Remote.api_key)
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
			<div>
			{this.state.summary 
				? <MovieDetails summary={this.state.summary} backdrop={this.state.backdrop} poster={this.state.poster}/>
				: <span>loading...</span>
			}
			{this.state.credits
				? <MovieCast cast={this.state.credits}/>
				: <span>loading...</span>
			}
			{this.state.similar
				? <SimilarTv similar={this.state.similar} />
				: <span>loading...</span>
			}
			
			</div>
		);
	}

});

module.exports = TvDetailsView;