var React = require('react');

var Player = React.createClass({

	componentDidMount: function() {
		console.log(this.props.id);
		var playerElement = this.refs.pl.getDOMNode();
		var player = new Clappr.Player({
  			sources: [this.props.id],
  			poster: 'https://i.ytimg.com/vi/' + this.props.id + '/hqdefault.jpg',
  			parentId: '#player-wrapper',
  			plugins: {
    			playback: [YoutubePlayback]
  			}
		});

		/*player.attachTo(player);*/
	},		
	render: function() {
		console.log(Clappr);
		return (
			<div>
				{this.props.id}
				<div id="player-wrapper" ref="pl"></div>
			</div>
		);
	}

});

module.exports = Player;