var React = require('react');
var LiveTvContainer = require('./LiveTvContainer');

var LiveTvView = React.createClass({

	render: function() {
		return (
			<div>
				live tv be here
				<LiveTvContainer />
			</div>
		);
	}

});

module.exports = LiveTvView;