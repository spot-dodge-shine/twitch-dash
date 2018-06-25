'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import SpotifyVoteline from './spotify-voteline'

const SpotifyVotecycle = props => {
  const {votecycle} = props
  let totalVotes = 0
  totalVotes = votecycle.votechoices.reduce((total, voteChoice) => {
    return total + voteChoice.votes
  }, 0)


  return (
    <div>
      {votecycle.id ?
        votecycle.votechoices
          .sort((prev, next) => {
            return prev.votecycleEnumId - next.votecycleEnumId
          })
          .map(votechoice => {
            return (
              <SpotifyVoteline
                key={votechoice.id}
                votechoice={votechoice}
                totalVotes={totalVotes}
              />)
        }) :
        <Segment
          attached
        >
          Select a Spotify playlist to start a music poll!
        </Segment>
      }
    </div>
  )

}

export default SpotifyVotecycle
