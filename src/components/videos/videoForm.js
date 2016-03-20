"use strict";

var React = require('react');
var Input = require('../common/textInput');

var VideoForm = React.createClass({
  propTypes: {
    video: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },


  render: function() {
    return (
      <form>
        <h1>Manage Video</h1>

        <Input name="title" label="Title" placeholder="Title" value={this.props.video.title} onChange={this.props.onChange} error={this.props.errors.title} />
        <Input name="description" label="Description" placeholder="..." value={this.props.video.description} onChange={this.props.onChange} error={this.props.errors.title} />
        <Input name="snapshotUrl" label="Snapshot URL" placeholder="http://[large]" value={this.props.video.snapshotUrl} onChange={this.props.onChange} error={this.props.errors.snapshotUrl} />
        <Input name="snapshotUrlThumb" label="Snapshot URL thumb" placeholder="http://[small]" value={this.props.video.snapshotUrlThumb} onChange={this.props.onChange} error={this.props.errors.snapshotUrlThumb} />

        <input type='submit' value='Save' className='btn btn-default' onClick={this.props.onSave} />
      </form>
    );
  }
});

module.exports = VideoForm;