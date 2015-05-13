var React = require('react');
var LiveTvRow = require('./LiveTvRow');

var LiveTv = React.createClass({

	render: function() {
		var rows = this.props.data.map(function (row) {
			return <LiveTvRow data={row} />;
		});
		return (
			<div>
				dis is live LiveTv
				<hr />
				{rows}
			</div>
		);
	}

});

module.exports = LiveTv;