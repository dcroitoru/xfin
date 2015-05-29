var React = require('react');
var Remote = require('../Remote');
var request = require('superagent');

var SearchView = React.createClass({
	getInitialState: function() {
		return {
			searchResults:  []
		};
	},
	search: function (event) {
		event.preventDefault();
		var query = this.refs.searchInput.getDOMNode().value;
		console.log('should search for', query);

		request.get(Remote.tmdb + '/search/multi?api_key=' + Remote.api_key + "&query=" + query)
		.end(function (err, res) {
			console.log('search results', res.body);
			this.setState({
				searchResults: res.body.results
			});
		}.bind(this));
	},
	render: function() {
		var searchList = this.state.searchResults.map(function (item, index) {
			var q;
			if(item.media_type == "movie")
				q = <div>{item.title} --  {item.media_type} -- {item.release_date}</div>;
			else { 
				if(item.media_type == "tv") {
					q = <div>{item.name} --  {item.media_type} -- {item.first_air_date}</div>;
				} else {
					q = <div>{item.name} --  {item.media_type}</div>;
				}
			}

			return (<li key={index}>
					{q}
				</li>);
		})
		return (
			<div>
			here be search SearchView

			<div>
			<form onSubmit={this.search}>
				<input ref="searchInput" /> <button>search</button>
			</form>
			</div>

				<div>
					<ul>
						{searchList}
					</ul>
				</div>
			</div>
		);
	}

});

module.exports = SearchView;