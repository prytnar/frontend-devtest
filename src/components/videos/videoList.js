'use strict';

var React = require('react');
var Link = require('react-router').Link;
var VideoActions = require('../../actions/videoActions');
var toastr = require('toastr');
var popover = require('bootstrap').Popover;

var VideoList = React.createClass({
  propTypes: {
    videos: React.PropTypes.array.isRequired
  },

  componentDidMount: function() {
    $('[data-toggle="popover"]').popover({
      html: true
    });
  },

  render: function() {
    var parent = this;

    return (
      <table className='table'>
        <thead>
          <th></th>
          <th>ID</th>
          <th>Title</th>
          <th></th>
        </thead>
        <tbody>
          {this.props.videos.map(parent.createVideoRow, this)}
        </tbody>
      </table>
    );
  },

  createVideoRow: function(video) {
    return (
      <tr key={video.id}>
        <td>
          <img src={video.snapshotUrlThumb} data-toggle="popover" data-content={'<img src=' + video.snapshotUrl + '/>'} />
        </td>
        <td><Link to='manageVideo' params={{id: video.id}} >{video.id}</Link></td>
        <td>{video.title}</td>
        <td><a href="#" onClick={this.deleteVideo.bind(this, video.id)}>Delete</a></td>
      </tr>
    );
  },

  deleteVideo: function(id, event) {
    event.preventDefault();
    VideoActions.deleteVideo(id);
    toastr.success('Video deleted');
  }
});

module.exports = VideoList;
