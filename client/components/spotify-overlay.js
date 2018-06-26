'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import SpotifyVoteline from './spotify-voteline'
import { getActiveVotecycleServer } from '../store'

class SpotifyOverlay extends Component {
  constructor(props) {
    super(props)
    // Get this.votecycle using API route
    this.votecycle = this.props.activeVotecycle(this.props.userId)
  }

  render() {
    if (this.votecycle.id) {
      let totalVotes = 0
      totalVotes = this.votecycle.votechoices.reduce((total, voteChoice) => {
        return total + voteChoice.votes
      }, 0)
    }
  
  
    return (
      <div>
        {this.votecycle.id ?
          this.votecycle.votechoices
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
            PLACEHOLDER FOR OVERLAY
          </Segment>
        }
      </div>
    )
  }

}

const mapDispatch = (dispatch) => {
  return {
    activeVotecycle: (userId) => dispatch(getActiveVotecycleServer(userId)),
  }
}

export default connect(null, mapDispatch)(SpotifyOverlay)
