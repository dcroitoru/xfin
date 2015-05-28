var React = require('react');
var PlayerContainer = require('./PlayerContainer');

var PlayerView = React.createClass({

	render: function() {
		return (
			<div>
				here be PlayerView

				<PlayerContainer />
			</div>
		);
	}

});

module.exports = PlayerView;