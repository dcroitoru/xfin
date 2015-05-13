var React = require('react');
var LiveTv = require('./LiveTv');
var Reflux = require('reflux');
var AppStore = require('../AppStore');
var AppActions = require('../AppActions');

var LiveTvContainer = React.createClass({
	mixins: [Reflux.connect(AppStore)],
	getInitialState: function() {
		return {
			livetv: []
		};
	},
	componentDidMount: function() {
		AppActions.getLiveTv('digi');
	},

	getDigi: function () {
		AppActions.getLiveTv('digi');
	},
	getUpc: function () {
		AppActions.getLiveTv('upc');
	},

	render: function() {
		return (
			<div>
				live tv container be here
				<div>
				<button onClick={this.getUpc}>upc</button>
				<button onClick={this.getDigi}>digi</button>
				</div>
				<LiveTv data={this.state.livetv}/>
			</div>
		);
	}

});

module.exports = LiveTvContainer;