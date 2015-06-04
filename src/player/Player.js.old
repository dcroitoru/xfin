var React = require('react');


var Player = React.createClass({
	playFull: function () {
		console.log(p.core.toggleFullScreen);
		//p.core.mediaControl.trigger("container:fullscreen", 'abc');
		p.core.mediaControl.$fullscreenToggle.click();
		//window.p.core.toggleFullScreen();
	},
	componentDidMount: function() {
		console.log(this.props.id);
		var playerElement = this.refs.pl.getDOMNode();
		player = new Clappr.Player({
  			sources: [this.props.id],
  			poster: 'https://i.ytimg.com/vi/' + this.props.id + '/hqdefault.jpg',
  			parentId: '#player-wrapper',
  			mute: true,
  			plugins: {
    			playback: [YoutubePlayback]
  			}
		});

		player.mute();
		player.play();

		window.player = player;

		/*player.attachTo(player);*/
	},		
	render: function() {
		console.log(Clappr);
		return (
			<div>
				{this.props.id}
				<button onClick={this.playFull}>play in fullscreen</button>
				<div id="player-wrapper" ref="pl"></div>
			</div>
		);
	}

});

module.exports = Player;