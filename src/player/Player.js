var React = require('react');

var Player = React.createClass({

	componentDidMount: function() {
		var playerElement = this.refs.pl.getDOMNode();
		var player = new Clappr.Player({
  			sources: ['nfWlot6h_JM'],
  			poster: 'https://i.ytimg.com/vi/nfWlot6h_JM/hqdefault.jpg',
  			/*parentId: '#player-wrapper',*/
  			plugins: {
    			playback: [YoutubePlayback]
  			}
		});

		player.attachTo(player);
	},		
	render: function() {
		console.log(Clappr);
		return (
			<div>
				<div id="player-wrapper" ref="pl"></div>
			</div>
		);
	}

});

module.exports = Player;