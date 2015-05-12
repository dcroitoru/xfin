var React = require('react');
var SportsFeatured = require('./SportsFeatured');
var SportsLive = require('./SportsLive');

var Sports = React.createClass({

	render: function() {

		return (
			<div>
				<SportsFeatured data={this.props.data.featured} />
				<SportsLive data={this.props.data.live} />
				<SportsLive data={this.props.data.nba} />
				<SportsLive data={this.props.data.nhl} />
			</div>
		);
	}

});

module.exports = Sports;