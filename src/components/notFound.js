"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var NotFound = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Not found</h1>
				<p>
					<Link to='app'>Back</Link>
				</p>
			</div>
		);
	}
});

module.exports = NotFound;