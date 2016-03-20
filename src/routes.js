"use strict";

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name='app' path='/' handler={require('./components/app')}>
    <DefaultRoute name='videos' handler={require('./components/videos/videoPage')} />
    <Route name='addVideo' path='video' handler={require('./components/videos/manageVideoPage')} />
    <Route name='manageVideo' path='video/:id' handler={require('./components/videos/manageVideoPage')} />

    <NotFoundRoute handler={require('./components/notFound')} />
    <Redirect from='about-us' to='about' />
    <Redirect from='about/*' to='about' />
  </Route>
);

module.exports = routes;