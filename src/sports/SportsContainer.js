var React = require('react');
var Reflux = require('reflux');
var Store = require('../AppStore');
var AppActions = require('../AppActions');

var Sports = require('./Sports');

var SportsContainer = React.createClass({
	mixins: [Reflux.connect(Store)],
	componentDidMount: function() {
		AppActions.getSports();
	},
	getInitialState: function() {
		return {
			sports: '12343' 
		};
	},

	render: function() {
		return (
			<div>
				sports container be here
				<Sports data={this.state.sports}/>
			</div>
		);
	}

});

module.exports = SportsContainer;