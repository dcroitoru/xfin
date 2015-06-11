var React = require('react');
var PlayerDya = require('./PlayerDya');
var AppStore = require('../AppStore');
var Reflux = require('reflux');

var PlayerDyaView = React.createClass({
	mixins: [Reflux.connect(AppStore)],
	contextTypes: {
    	router: React.PropTypes.func
  	},
  	getInitialState: function() {
  		return {
  			url: ''
  		};
  	},
  	componentDidMount: function() {
      var station = this.context.router.getCurrentParams().station;
  		var st = AppStore.getStation(station);
  		this.setState({url: st.meta.url});

  	},
	render: function() {
		return (
			<div>
				here be PlayerView

				<PlayerDya url={this.state.url}/>
			</div>
		);
	}

});

module.exports = PlayerDyaView;