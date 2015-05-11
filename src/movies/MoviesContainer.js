var React = require('react');
var Reflux = require('reflux');
var Store = require('../AppStore');
var AppActions = require('../AppActions');
var Movies = require('./Movies');

var MoviesContainer = React.createClass({
	mixins: [Reflux.connect(Store)],
	componentDidMount: function() {
		AppActions.getMovies();
	},
	render: function() {
		return (
			<div>movies container will call for movies
				<Movies data={this.state.movies}/>
			</div>
		);
	}

});



module.exports = MoviesContainer;