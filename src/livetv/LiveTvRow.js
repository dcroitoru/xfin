var React = require('react');

var LiveTvRow = React.createClass({
	contextTypes: {
    	router: React.PropTypes.func
  	},
	programClick: function (p, event) {
		event.preventDefault();
		console.log('should open program', p);
		alert(p.title + " -- " + p.time+ " : \n" + p.desc);
	},
	channelClick: function (event) {
		event.preventDefault();
		console.log('should go to channel', this.props.data.meta.url);
		this.context.router.transitionTo('/playerdya/' + this.props.data.meta.title);
	},
	render: function() {
		return (
			<div className="tv-row">
				<a href="" onClick={this.channelClick}>
					<div className="channel-meta">
						<div>
					
				{
					this.props.data.meta.logo ? <img src={this.props.data.baseurl + this.props.data.meta.logo} /> : <span>{this.props.data.meta.title}</span>
				}
				
						</div>
						<div>{this.props.data.meta.position}</div>
					</div>
				</a>
				{this.props.data.programs.map(function (p) {
					return (
						
						<div className="program">
						<a href="" onClick={this.programClick.bind(this, p)}>
							<div>{p.title}</div>
							<div>{p.time}</div>
							</a>
						</div>
						
						);
				}.bind(this))}
			</div>
		);
	}

});

module.exports = LiveTvRow;

/*
					? <img src={this.props.meta.baseurl + this.props.data.meta.logo}>
					: <span>this.props.data.meta.title</span>*/