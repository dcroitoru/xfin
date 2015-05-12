var React = require('react');

var SportsLive = React.createClass({

	render: function() {
		var items = this.props.data && this.props.data.list.map(function (item, index) {
					return (<li><div key={index} className="simple-thumb">
						<img src={item.img}></img>
						<div className="title-bar">{item.title}</div>
						</div></li>)
				});
		return (
			<div className="sports-container" style={{backgroundImage: 'url(' + this.props.data.background + ')', color: '#fefefe'}}>
				<h1>{this.props.data.title}</h1>
				<ul>
				{items}
				</ul>

			</div>
		);
	}

});

module.exports = SportsLive;