var React = require('react');
var MovieThumbRenderer = require('../movies/MovieThumbRenderer');

var Tv = React.createClass({
	contextTypes: {
    	router: React.PropTypes.func
  	},
	onSelect: function (item) {
		console.log(item);
		this.context.router.transitionTo('/tv/' + item.id);
	},
	render: function() {
		var list = this.props.data && this.props.data.map(function (item, index) {
			return (<MovieThumbRenderer movie={item} key={index} selectHandler={this.onSelect.bind(this, item)}/>);
		}.bind(this));
		return (
			<div> here be tv
			<hr/>
			{list}
			</div>
		);
	}

});

module.exports = Tv;