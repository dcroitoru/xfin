var React = require('react');
var MoviesContainer = require('./MoviesContainer');

module.exports = React.createClass({

	render: function() {
		return (
			<div>this is movies view
				<MoviesContainer />
			</div>
		);
	}

});