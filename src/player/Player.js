var React = require('react');
var YouTube = require('react-youtube');


var Player = React.createClass({
	playFull: function () {
		$('#player-wrapper iframe').get(0).webkitRequestFullscreen();
	},
	justPlay: function () {
		this.refs.yt.playVideo();
	},
	onPlay: function (event) {
		console.log(event, 'PLAYING');
	},
	componentDidMount: function() {
		console.log(this.props.id);
		
	},		
	render: function() {
		
		const opts = {
	      height: '390',
	      width: '640',
	      playerVars: { // https://developers.google.com/youtube/player_parameters
	        autoplay: 1
	      }
	    };
		return (
			<div>
				{this.props.id}
				<button onClick={this.playFull}>play in fullscreen</button>
				<button onClick={this.justPlay}>play</button>
				<div id="player-wrapper" ref="pl">
				
				<YouTube ref="yt" url={'http://www.youtube.com/watch?v=' + this.props.id} opts={opts}
					onPlay={this.onPlay} />
      			
				</div>
			</div>
		);
	}

});

module.exports = Player;