var React = require('react');
var YouTube = require('react-youtube');


var Player = React.createClass({
	playFull: function () {
		$('#player-wrapper iframe').get(0).webkitRequestFullscreen();
	},
	componentDidMount: function() {
		console.log(this.props.id);
		
	},		
	render: function() {
		
		const opts = {
	      height: '390',
	      width: '640',
	      playerVars: { // https://developers.google.com/youtube/player_parameters
	        autoplay: 0
	      }
	    };
		return (
			<div>
				{this.props.id}
				<button onClick={this.playFull}>play in fullscreen</button>
				<div id="player-wrapper" ref="pl">
				
				<YouTube url={'http://www.youtube.com/watch?v=' + this.props.id} opts={opts} />
      			
				</div>
			</div>
		);
	}

});

module.exports = Player;