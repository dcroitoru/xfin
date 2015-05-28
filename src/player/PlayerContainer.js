var React = require('react');
var Player = require('./Player');
var Remote = require('../Remote.js');
var request = require('superagent');

var theid;
var PlayerContainer = React.createClass({
	contextTypes: {
    	router: React.PropTypes.func
  	},
  	getInitialState: function() {
  		return {
  			id: null
  		};
  	},
  	componentDidMount: function() {
  		theid = this.context.router.getCurrentParams().id;
		console.log(theid);

		request.get(Remote.tmdb + '/movie/' + theid + '/videos?api_key=' + Remote.api_key)
		.end(function (err, res) {
			console.log(res.body);
			this.setState({id: res.body.results[0].key});
		}.bind(this));
  	},
	render: function() {
		return (
			<div>player container be here
			{
				this.state.id 
				? <Player id={this.state.id}/>
				: ''
			}
				
			</div>
		);
	}

});

module.exports = PlayerContainer;