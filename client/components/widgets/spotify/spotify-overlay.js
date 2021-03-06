'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import SpotifyVoteline from './spotify-voteline'
import { getActiveVotecycleServer, getVotesServer, getPlayerStatusThunk } from '../../../store'

class SpotifyOverlay extends Component {
  constructor(props) {
    super(props)
    // Get this.votecycle using API route
    this.timer = setInterval(this.tick, 2000)
    this.tick()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tick = async () => {
    await this.props.activeVotecycle(this.props.userId)
    return this.props.getVotes(this.props.votecycle)
  }

  render() {
    let totalVotes = 0
    if (this.props.votecycle && this.props.votecycle.id) {
      totalVotes = this.props.votecycle.votechoices.reduce((total, voteChoice) => {
        return total + voteChoice.votes
      }, 0)
    }

    return (
      <div
        style={{
          width:'425px'
        }}
      >
        {this.props.votecycle && this.props.votecycle.id ?
          this.props.votecycle.votechoices
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
          <div />
        }
      </div>
    )
  }

}

const mapState = (state) => {
  return {
    votecycle: state.votecycle,
  }
}

const mapDispatch = (dispatch) => {
  return {
    activeVotecycle: (userId) => dispatch(getActiveVotecycleServer(userId)),
    getVotes: (votecycle) => dispatch(getVotesServer(votecycle)),
  }
}

export default connect(mapState, mapDispatch)(SpotifyOverlay)
