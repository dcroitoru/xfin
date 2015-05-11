var React = require('react');
var MovieThumbRenderer = require('./MovieThumbRenderer');

var Movies = React.createClass({
	contextTypes: {
    	router: React.PropTypes.func
  	},
	onSelect: function (item) {
		console.log(item);
		this.context.router.transitionTo('/movies/' + item.id);
	},
	render: function() {
		//console.log(this.props.data);
		var list = this.props.data && this.props.data.map(function (item, index) {
			return (<MovieThumbRenderer movie={item} key={index} />);
		}, this);
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