var React = require('react');
var LiveTv = require('./LiveTv');

var LiveTvContainer = React.createClass({
	getInitialState: function() {
		return {
			livetv: 'miaumiau' 
		};
	},

	render: function() {
		return (
			<div>
				live tv container be here
				<LiveTv data={this.state.livetv}/>
			</div>
		);
	}

});

module.exports = LiveTvContainer;