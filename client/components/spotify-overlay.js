'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Header } from 'semantic-ui-react'
import SpotifyVoteline from './spotify-voteline'
import { getActiveVotecycleServer, getVotesServer, getPlayerStatusThunk } from '../store'

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
    await this.props.getPlayerStatus()
    await this.props.activeVotecycle(this.props.userId)
    return this.props.getVotes(this.props.votecycle)
  }

  render() {
    let totalVotes = 0
    if (this.props.votecycle && this.props.votecycle.id) {
      console.log('votecycle', this.props.votecycle)
      totalVotes = this.props.votecycle.votechoices.reduce((total, voteChoice) => {
        console.log('anutha', voteChoice)
        return total + voteChoice.votes
      }, 0)
    }

    const { currentlyPlaying } = this.props.playerStatus

    console.log('votes: ', totalVotes)

    return (
      <div
        style={{
          width:'425px'
        }}
      >
        <Segment
          attached
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
        </Segment>
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
    playerStatus: state.playerStatus
  }
}

const mapDispatch = (dispatch) => {
  return {
    activeVotecycle: (userId) => dispatch(getActiveVotecycleServer(userId)),
    getVotes: (votecycle) => dispatch(getVotesServer(votecycle)),
    getPlayerStatus: () => dispatch(getPlayerStatusThunk())
  }
}

export default connect(mapState, mapDispatch)(SpotifyOverlay)
