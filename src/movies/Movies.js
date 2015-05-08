var React = require('react');
var MovieThumbRenderer = require('./MovieThumbRenderer');

var Movies = React.createClass({

	render: function() {
		console.log(this.props.data);
		var list = this.props.data && this.props.data.map(function (item, index) {
			return (<MovieThumbRenderer movie={item} key={index}/>);
		});
		return (
			<div>
			movies be here
			<hr/>
			{list}
			</div>
		);
	}

});

module.exports = Movies;