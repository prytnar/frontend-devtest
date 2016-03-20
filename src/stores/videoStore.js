'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';
var _videos = [];


// VideoStore is only PUBLIC API
var VideoStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllVideos: function() {
		return _videos;
	},

	getVideoById: function(id) {
		return _.find(_videos, {id: id});
	}
});
// END of PUBLIC API


Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_videos = action.initialData.videos;
			VideoStore.emitChange();
			break;
		case ActionTypes.CREATE_VIDEO:
			_videos.push((action.video));
			VideoStore.emitChange();
			break;
		case ActionTypes.UPDATE_VIDEO:
			var existingVideo = _.find(_videos, {id: action.video.id});
			var existingVideoIdx = _.indexOf(_videos, existingVideo);
			_videos.splice(existingVideoIdx, 1, action.video);
			VideoStore.emitChange();
			break;
		case ActionTypes.DELETE_VIDEO:
			_.remove(_videos, function(video) {
				return video.id === action.id;
			});
			VideoStore.emitChange();
			break;
		default:
			// no op
	}
});

module.exports = VideoStore;