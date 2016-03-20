'use strict';

var React = require('react');
var Link = require('react-router').Link;
// var VideoApi = require('../../api/videoApi');
var VideoActions = require('../../actions/videoActions');
var VideoStore = require('../../stores/VideoStore');
var VideoList = require('./videoList');

var VideoPage = React.createClass({

	getInitialState: function() {
		return {
			videos: VideoStore.getAllVideos()
		};
	},

	render: function() {
		var parent = this;

		return (
			<div>
				<h1>Videos</h1>
				<Link to='addVideo' className='btn btn-default'>Add video</Link>
				<VideoList videos={this.state.videos} />
			</div>
		);
	},

	componentWillMount: function() {
		VideoStore.addChangeListener(this._onChange);
	},

	componentWillUnMount: function() {
		VideoStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ videos: VideoStore.getAllVideos() });
	},

	createVideoRow: function(video) {
		return (
			<tr key={video.id}>
				<td><a href={'/#videos/' + video.id}>{video.id}</a></td>
				<td>{video.title}</td>
			</tr>
		);
	}
});

module.exports = VideoPage;