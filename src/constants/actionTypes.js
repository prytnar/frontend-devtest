'use strict';

var keyMirror = require('react/lib/keyMirror'); // this prevents from writing CREATE_VIDEO: CREATE_VIDEO

module.exports = keyMirror({
  INITIALIZE: null,
  CREATE_VIDEO: null,
  UPDATE_VIDEO: null,
  DELETE_VIDEO: null
});