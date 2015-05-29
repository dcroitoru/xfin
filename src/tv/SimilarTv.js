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
			<div className="similar">
				<div className="b-maxWidthContainer">
					<h2>Similar TV Shows</h2>
					{list}
				</div>
			</div>
		);
	}

});

module.exports = SimilarTv;