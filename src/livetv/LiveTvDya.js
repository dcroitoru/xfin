var React = require('react');
var LiveTvRow = require('./LiveTvRow');

var LiveTv = React.createClass({
	propTypes: { data: React.PropTypes.array.required },
	render: function() {
		var rows = this.props.data.map(function (item, index) {
			return (<div key={index}>{item.station_code}</div>);
		});
		return (
			<div>
				dis is live LiveTv DYA!!!
				<hr />
				{rows}
			</div>
		);
	}

});

module.exports = LiveTv;