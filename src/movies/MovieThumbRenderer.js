var React = require('react');
var Reouter = require('react-router');
var AppActions = require('../AppActions');

var MovieThumbRenderer = React.createClass({
	contextTypes: {
    	router: React.PropTypes.func
  	},
	handleClick: function() {
		//AppActions.selectMovie(this.props.movie);
		this.context.router.transitionTo('/movie/' + this.props.movie.id);
	},
	render: function() {
		var url = "http://xfinitytv.comcast.net/api/entity/thumbnail/" + this.props.movie.id +"/180/240?noRedir=true"
		return (
			<div className="movie-thumb" onClick={this.handleClick}>
				<img src={url}></img>
				{this.props.movie.title}
			</div>
		);
	}

});

module.exports = MovieThumbRenderer;