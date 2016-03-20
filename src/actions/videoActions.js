'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var VideoApi = require('../api/videoApi');
var ActionTypes = require('../constants/actionTypes');

var VideoActions = {
	createVideo: function(video) {
		var newVideo = VideoApi.saveVideo(video); // will handle callback or promises in real case

		// tells all stores that video was created
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_VIDEO,
			video: newVideo
		});
	},

	updateVideo: function(video) {
		var updatedVideo = VideoApi.saveVideo(video);

		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_VIDEO,
			video: updatedVideo
		});
	},

	deleteVideo: function(id) {
		var deletedVideo = VideoApi.deleteVideo(id);
		// for async behaviour split into 2 actions should be considered
		// DELETE will let UI know that async call is in progress
		// and DELETED will let know when it is done
		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_VIDEO,
			id: id
		});
	}
};

module.exports = VideoActions;
