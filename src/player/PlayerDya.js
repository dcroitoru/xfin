var React = require('react');
var pl;
var PlayerDya = React.createClass({
	playFull: function () {
		$('#player-wrapper div').get(0).webkitRequestFullscreen();
	},
	justPlay: function () {
		// this.refs.yt.playVideo();
	},
	onPlay: function (event) {
		// console.log(event, 'PLAYING');
	},
	componentDidMount: function() {
		if(!pl)
			pl = new Clappr.Player({autoPlay: true});
		pl.attachTo(this.refs.pl.getDOMNode());
	},		
	render: function() {
		console.log(this.props.url);
		if(pl && this.props.url)
			pl.load(this.props.url);
		return (
			<div>
				{this.props.id}
				<button onClick={this.playFull}>play in fullscreen</button>
				<button onClick={this.justPlay}>play</button>
				<div id="player-wrapper" ref="pl">
				
      			
				</div>
			</div>
		);
	}

});

module.exports = PlayerDya;