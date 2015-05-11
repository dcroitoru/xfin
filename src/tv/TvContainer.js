var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../AppStore');
var AppActions = require('../AppActions');
var Tv = require('./Tv');

var TvContainer = React.createClass({
	mixins: [Reflux.connect(AppStore)],
	componentDidMount: function() {
		AppActions.getTv();
	},
	render: function() {
		return (
			<div>
				here be tv container
				<Tv data={this.state.tv}/>
			</div>
		);
	}

});

module.exports = TvContainer;