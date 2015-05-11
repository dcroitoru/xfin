var React = require('react');
// <img src={this.props.backdrop}></img>
var MovieDetails = React.createClass({

	render: function() {
		var genres = this.props.summary.genres.map(function (genre, index) {
			return <div key={index}>{genre.name}</div>;
		});
		return (
			<div>
				<img src={this.props.backdrop}></img>
				<hr/>
				{this.props.summary.title}
				<hr/>
				<img src={this.props.poster}></img>
				<span>Overview: {this.props.summary.overview}</span>
				<hr/>
				{genres}
				<div>Release date: {this.props.summary.release_date}</div>

			</div>
		);
	}

});

module.exports = MovieDetails;