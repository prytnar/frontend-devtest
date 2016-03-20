"use strict";

//This file is mocking a web API by hitting hard coded data.
var videos = require('./videoData').videos;
var _ = require('lodash');

//This would be performed on the server in a real app. Just stubbing in.
var _generateId = function(video) {
	return video.title.toLowerCase();
};

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

var VideoApi = {
	getAllVideos: function() {
		return _clone(videos);
	},

	getVideoById: function(id) {
		var video = _.find(videos, {id: id});
		return _clone(video);
	},

	saveVideo: function(video) {
		//pretend an ajax call to web api is made here
		console.log('Pretend this just saved the video to the DB via AJAX call...');

		if (video.id) {
			var existingVideoIndex = _.indexOf(videos, _.find(videos, {id: video.id})); 
			videos.splice(existingVideoIndex, 1, video);
		} else {
			//Just simulating creation here.
			//The server would generate ids for new videos in a real app.
			//Cloning so copy returned is passed by value rather than by reference.
			video.id = _generateId(video);
			videos.push(video);
		}

		return _clone(video);
	},

	deleteVideo: function(id) {
		console.log('Pretend this just deleted the video from the DB via an AJAX call...');
		_.remove(videos, { id: id});
	}
};

module.exports = VideoApi;