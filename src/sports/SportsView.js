var React = require('react');
var SportsContainer = require('./SportsContainer');

var SportsView = React.createClass({

	render: function() {
		return (
			<div>
				sports be here
				<SportsContainer />
			</div>
		);
	}

});

module.exports = SportsView;