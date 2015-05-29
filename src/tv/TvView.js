var React = require('react');
var TvContainer = require('./TvContainer');

var TvView = React.createClass({

	render: function() {
		return (
			<div className="innerMainWrapper">
				tv view be here
				<TvContainer />
			</div>
		);
	}

});

module.exports = TvView;