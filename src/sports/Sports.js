var React = require('react');

var Sports = React.createClass({

	render: function() {
		return (
			<div>
				dis is sports
				<hr />
				{this.props.data}
			</div>
		);
	}

});

module.exports = Sports;