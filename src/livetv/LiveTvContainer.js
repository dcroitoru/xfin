var React = require('react');
var Reflux = require('reflux');
var LiveTv = require('./LiveTv');
var LiveTvDya = require('./LiveTvDya');
var AppStore = require('../AppStore');
var AppActions = require('../AppActions');

var LiveTvContainer = React.createClass({
	mixins: [Reflux.connect(AppStore)],
	getInitialState: function() {
		return {
			livetv: [],
			dya: false
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
	getDya: function () {
		AppActions.getLiveTv('dya');
	},

	render: function() {
		return (
			<div>
				live tv container be here
				<div className="livetv-buttonbar">
				<button onClick={this.getDya}>dya</button>
				<button onClick={this.getUpc}>upc</button>
				<button onClick={this.getDigi}>digi</button>
				</div>
				{this.state.dya
					?<LiveTv data={this.state.livetv}/>
					:<LiveTv data={this.state.livetv}/>
				}
			</div>
		);
	}

});

module.exports = LiveTvContainer;