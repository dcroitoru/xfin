var React = require('react');
var router = require('react-router');

var MovieDetailsView = React.createClass({
	contextTypes: {
    	router: React.PropTypes.func
  	},
	render: function() {
		var theid = this.context.router.getCurrentParams().id;
		return (
			<div>{theid}</div>
		);
	}

});

module.exports = MovieDetailsView;