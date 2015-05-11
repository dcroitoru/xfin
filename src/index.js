var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

var MoviesView = require('./movies/MoviesView');
var MovieDetailsView = require('./movies/MovieDetailsView');
var TvView = require('./tv/TvView');
var TvDetailsView = require('./tv/TvDetailsView');

var App = React.createClass({
	render: function () {
		return (
			<div>
				<div>
					<Link to="app">Home</Link> | <Link to="movies">Movies </Link> | <Link to="tv">TV Shows</Link> | <Link to="livetv">Live TV</Link>  | <Link to="sports">Sports</Link>
				</div>
				<hr/>
				<RouteHandler />
			</div>
			)
		
	}
});

var Home = React.createClass({render: function (){ return <div>this is home</div>}});
var rrr = React.createClass({render: function (){ return <div>this is rrr</div>}});

var routes = (
	<Route name="app" path="/" handler={App}>
		<DefaultRoute handler={Home} />
		<Route name="movies" handler={MoviesView} />
		<Route name="tv" handler={TvView} />
		<Route name="livetv" handler={rrr} />
		<Route name="sports" handler={rrr} />
		<Route name="moviedetails" path="movie/:id" handler={MovieDetailsView} />
		<Route name="tvdetails" path="tv/:id" handler={TvDetailsView} />
	</Route>
	);

Router.run(routes, function (Handler) {
	React.render(<Handler />, document.getElementById('content'));
});