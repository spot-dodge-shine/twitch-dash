'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Segment, Progress } from 'semantic-ui-react'

const SpotifyPlayer = props => {
  const { currentlyPlaying } = props

  return (
    <Segment
      attached
      style={{ display: 'flex' }}
    >
    <div>
      <Image
        src={currentlyPlaying.track.image}
        size='mini'
        style={{ marginRight: '1rem' }}
      />
    </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{ marginRight: '1rem',
          textAlign: 'left'
        }}
        >
          <strong>{currentlyPlaying.track.name}</strong><br />
          {currentlyPlaying.track.artist} - {currentlyPlaying.track.album}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Progress
            progress='value'
            value={votechoice.votes}
            total={totalVotes}
            inverted
            color='grey'
            style={{ width: '14rem', marginBottom: '0' }}
          />
        </div>
      </div>
    </Segment>
  )
}

export default SpotifyPlayer
