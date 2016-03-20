'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var VideoApi = require('../api/videoApi');
var ActionTypes = require('../constants/actionTypes');

var InitializeActions = {
	initApp: function() {
		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				videos: VideoApi.getAllVideos()
			}
		});
	}
};

module.exports = InitializeActions;
