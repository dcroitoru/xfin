var React = require('react');
var Reflux = require('reflux');
var Movies = require('./Movies');
var Store = require('../AppStore');
var AppActions = require('../AppActions');

var MoviesContainer = React.createClass({
	mixins: [Reflux.connect(Store)],
	componentDidMount: function() {
		AppActions.getMovies();
	},
	render: function() {
		console.log('rendering', this.state.movies);
		console.log('rendering', this.state.messages);
		return (
			<div>movies container will call for movies
				<Movies data={this.state.movies}/>
			</div>
		);
	}

});



module.exports = MoviesContainer;