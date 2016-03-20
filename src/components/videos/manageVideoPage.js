"use strict";

var React = require('react');
var Router = require('react-router');
var VideoForm = require('./videoForm');
var VideoActions = require('../../actions/videoActions');
var VideoStore = require('../../stores/VideoStore');
var toastr = require('toastr');

// ***
// this is our "controller view"
// ***
var ManageVideoPage = React.createClass({
  mixins: [
    Router.Navigation
  ],

  statics: {
    willTransitionFrom: function(transition, component) {
      if (component.state.dirty && !confirm('Leave w/o saving ?')) {
        transition.abort();
      }
    }
  },

  getInitialState: function() {
    return {
      video: { id: '', title: '', description: '', 'snapshotUrl': '', 'snapshotUrlThumb': ''},
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function() { // will be run before rendering
    var videoId = this.props.params.id;

    if (videoId) {
      this.setState({video: VideoStore.getVideoById(videoId)});
    }
  },

  setVideoState: function(event) {
    this.setState({ dirty: true });

    var field = event.target.name;
    var value = event.target.value;

    this.state.video[field] = value;
    this.setState({ video: this.state.video });
  },

  videoFormIsValid: function() {
    var isValid = true;
    this.state.errors = {};

    if (this.state.video.title.length < 3) {
      this.state.errors.title = 'Should be at least 3.';
      isValid = false;
    }

    if (this.state.video.description.length < 3) {
      this.state.errors.description = 'Should be at least 3.';
      isValid = false;
    }

    this.setState({ errors: this.state.errors });
    return isValid;
  },

  saveVideo: function(event) {
    event.preventDefault();

    if (!this.videoFormIsValid()) {
      return;
    }

    if (this.state.video.id) {
      VideoActions.updateVideo(this.state.video);
    } else {
      VideoActions.createVideo(this.state.video);
    }

    this.setState({ dirty: false });
    toastr.success('Video saved.');
    this.transitionTo('videos');
  },

  render: function() {
    return (
      <VideoForm
        video={this.state.video}
        onChange={this.setVideoState}
        onSave={this.saveVideo}
        errors={this.state.errors} />
    );
  }
});

module.exports = ManageVideoPage;