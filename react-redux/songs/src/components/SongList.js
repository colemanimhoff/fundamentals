import React, { Component } from 'react'
import { connect } from 'react-redux'

import { selectSong } from '../actions'

class SongList extends Component {
  renderList() {
    return this.props.songs.map((song, index) => {
      return (
        <div className="item" key={song.title + '-' + index}>
          <div className="right floated content">
            <button
              className="ui button primary"
              onClick={() => this.props.selectSong(song)}
            >
              Select
            </button>
          </div>
          <div className="content">{song.title}</div>
        </div>
      )
    })
  }

  render() {
    return <div className="ui divided list">{this.renderList()}</div>
  }
}

function mapStateToProps(state) {
  return {
    songs: state.songs,
  }
}

// connect returns a function; the second set calls the function we return and pass our coumponent into it
export default connect(mapStateToProps, { selectSong })(SongList)
