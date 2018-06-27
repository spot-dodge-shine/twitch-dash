'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Icon } from 'semantic-ui-react'

const currentlyPlaying = {
  "name": "To My Soul",
  "artist": "Jerry Folk",
  "album": "To My Soul",
  "image": "https://i.scdn.co/image/b23eafdbe6d6b8cbce146f61e11e2e450097d7df",
  "id": "76xNAVwiQccBXImICK5zUP",
  "uri": "spotify:track:76xNAVwiQccBXImICK5zUP"
}

const SpotifyPlayer = props => {
  console.log(props)

  return (
    <Segment
      attached
      style={{ display: 'flex' }}
    >
    {/* <div>
      <Image
        src={currentlyPlaying.track.image}
        size='mini'
        style={{ marginRight: '1rem' }}
      />
    </div> */}
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
                {currentlyPlaying ? currentlyPlaying.name - currentlyPlaying.artist }
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
        <Icon
          name='pause'
          size='large'
        />
        <Icon
          name='forward'
          size='large'
        />
        </div>
      </div>
    </Segment>
  )
}

// const mapStateToProps = state => {
//   return {
//     currentlyPlaying: Object.values(state.tracks)
//         .filter(track => track.id === state.currentlyPlayingId)[0]
//   }
// }

export default SpotifyPlayer
