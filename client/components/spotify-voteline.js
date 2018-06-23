'use strict'

import React from 'react'
import { Segment, Image, Progress } from 'semantic-ui-react'

const SpotifyVoteline = props => {
  const { votechoice, totalVotes } = props
  return (
    <Segment
        style={{ display: 'flex' }}
        attached
      >
        <div>
          <Image
            src={votechoice.track.image}
            size='mini'
            style={{ marginRight: '1rem' }}
          />
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div
            style={{ marginRight: '1rem' }}
          >
            <strong>{votechoice.track.name}</strong><br />
            {votechoice.track.artist} - {votechoice.track.album}
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
              color='green'
              style={{ width: '15rem', marginBottom: '0' }}
            />
          </div>
        </div>
      </Segment>
  )
}

export default SpotifyVoteline
