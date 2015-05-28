var React = require('react');
// <img src={this.props.backdrop}></img>
var MovieDetails = React.createClass({
	contextTypes: {
    	router: React.PropTypes.func
  	},
  	playMovie: function () {
  		console.log('should play movie', this.props.summary.id);
  		this.context.router.transitionTo('/player/' + this.props.summary.id);
  	},
	render: function() {
		var genres = this.props.summary.genres.map(function (genre, index) {
			return <div key={index}>{genre.name}</div>;
		});
		return (
			<div >
				<div className="c-billboard">
					<div className="c-billboard__posterWrapper">
						<img src={this.props.backdrop}></img>
					</div>
					<div className="c-billboard__gradient"></div>
					<div className="c-billboard__overlay">
						<div className="b-maxWidthContainer">
							<div className="c-assetHeader__title--billboard">
								{this.props.summary.title}
							</div>
							<button onClick={this.playMovie} className="c-retailButton c-retailButton--purchase">Play</button>
						</div>
					</div>
				</div>
				<div className="content-wrapper whiteNoise">
					<div className="b-maxWidthContainer">
						<div className="pack-shot">
							<img src={this.props.poster}></img>
						</div>
						<div className="asset-overview">
						<span>Overview: {this.props.summary.overview}</span>
						<hr/>
						{genres}
						<div>Release date: {this.props.summary.release_date}</div>
						</div>
						
					</div>
				</div>
				

			</div>
		);
	}

});

module.exports = MovieDetails;