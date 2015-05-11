var React = require('react');
var Reouter = require('react-router');
var AppActions = require('../AppActions');
var Remote= require('../Remote');

var MovieThumbRenderer = React.createClass({

	render: function() {
		var url = Remote.poster(this.props.movie);
		return (
			<div className="movie-thumb" onClick={this.props.selectHandler}>
				<img src={url}></img>
				{this.props.movie.title}
			</div>
		);
	}

});

module.exports = MovieThumbRenderer;