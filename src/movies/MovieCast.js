var React = require('react');

var MovieCast = React.createClass({

	render: function() {

		return (
			<div>
			<h3>Cast</h3>
			<ul>
			{
				this.props.cast.map(function (item, index) {
					return <li key={index}>{item.name}</li>;
				})
			}
			</ul>
			</div>
		);
	}

});

module.exports = MovieCast;