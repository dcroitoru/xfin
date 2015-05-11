var React = require('react');

var Sports = React.createClass({

	render: function() {
		var items = this.props.data && this.props.data.map(function (item, index) {
					return (<div key={index}>
						<img src={item.url}></img>
						<div>{item.id}</div>
						</div>)
				});
		return (
			<div>
				dis is sports
				<hr />
				{items}
			</div>
		);
	}

});

module.exports = Sports;