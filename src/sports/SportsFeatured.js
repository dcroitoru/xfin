var React = require('react');

var SportsFeatured = React.createClass({

	render: function() {
		var items = this.props.data && this.props.data.list.map(function (item, index) {
					return (<div key={index} className="simple-thumb">
						<img src={item.img}></img>
						<div>{item.id}</div>
						</div>)
				});
		return (
			<div className="sports-container" style={{backgroundImage: 'url(' + this.props.data.background + ')'}}>
				<h1>{this.props.data.title}</h1>
				{items}

			</div>
		);
	}

});

module.exports = SportsFeatured;