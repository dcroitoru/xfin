var React = require('react');

var LiveTv = React.createClass({

	render: function() {
		return (
			<div>
				dis is live LiveTv
				<hr />
				{this.props.data}
			</div>
		);
	}

});

module.exports = LiveTv;