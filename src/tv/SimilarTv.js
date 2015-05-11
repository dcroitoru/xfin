var React = require('react');
var MovieThumbRenderer = require('../movies/MovieThumbRenderer');

var SimilarTv = React.createClass({
	contextTypes: {
    	router: React.PropTypes.func
  	},
	onSelect: function (item) {
		console.log(item);
		this.context.router.transitionTo('/tv/' + item.id);
	},
	render: function() {
		var list = this.props.similar.map(function (movie, index) {
		return (<MovieThumbRenderer movie={movie} key={index} selectHandler={this.onSelect.bind(this, movie)}/>);
		}, this);
	
		return (
			<div>
				<h2>Similar Movies</h2>
				{list}
			</div>
		);
	}

});

module.exports = SimilarTv;