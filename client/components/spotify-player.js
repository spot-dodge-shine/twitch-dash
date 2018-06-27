'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Icon } from 'semantic-ui-react'
import { pausePlaybackThunk, resumePlaybackThunk, nextPlaybackThunk } from '../store/spotify-player'

// const currentlyPlaying = {
//   name: "To My Soul",
//   artist: "Jerry Folk",
//   album: "To My Soul",
//   image: "https://i.scdn.co/image/b23eafdbe6d6b8cbce146f61e11e2e450097d7df",
//   id: "76xNAVwiQccBXImICK5zUP",
//   uri: "spotify:track:76xNAVwiQccBXImICK5zUP"
// }

class SpotifyPlayer extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const {
      isPlaying,
      currentlyPlaying,
      pausePlayback,
      resumePlayback,
      nextPlayback
    } = this.props.playerStatus

    return (
      <Segment
        attached
        style={{ display: 'flex' }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              marginRight: '1rem',
              textAlign: 'left',
            }}
          >
            <Header as='h3'>
              <Header.Content>
                Currently Playing:
                <Header.Subheader>
                  {currentlyPlaying
                    ? `${currentlyPlaying.name} - ${currentlyPlaying.artist}`
                    : 'None'
                  }
                </Header.Subheader>
              </Header.Content>
            </Header>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
          {
            isPlaying
              ? <Icon
                  name='pause'
                  size='large'
                  onClick={pausePlayback}
                />
              : <Icon
                  name='play'
                  size='large'
                  onClick={resumePlayback}
                />
          }

          <Icon
            name='forward'
            size='large'
            onClick={nextPlayback}
          />
          </div>
        </div>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    playerStatus: state.playerStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pausePlayback: () => dispatch(pausePlaybackThunk()),
    resumePlayback: id => dispatch(resumePlaybackThunk(id)),
    nextPlayback: () => dispatch(nextPlaybackThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyPlayer)
