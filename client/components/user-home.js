import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import PlaylistDropdown from './playlist-dropdown'
import NavBar from './navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'semantic-ui-react'
import {getActiveVotecycleServer, createVotechoiceServer, createActiveVotecycleServer} from '../store/votecycle'
import { playTrack } from '../store/spotify-tracks'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
    this.timer = setInterval(this.tick, 10000)
    this.counter = 0
    this.props.activeVotecycle(this.props.userId)
      .then(() => {
        this.tick()
      })
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 10000) // 10 seconds for testing purposes
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.counter += 1
    if (!this.props.votecycle) {
      this.props.createActiveVotecycle(this.props.userId)
        .then(() => {
          let choiceArr = []
          for (let i = 0; i < this.props.numChoices; i++) {
            // TODO: pick random songs from playlist, associate songIds with votechoices
            choiceArr.push(this.props.createVotechoice(this.props.votecycle.id) )
          }
          return Promise.all(choiceArr)
        }
      )
    }
  }

  render() {
    const {twitchLogin} = this.props
    const fakeTrack = {
      name: "To My Soul",
      artist: "Jerry Folk",
      id: "76xNAVwiQccBXImICK5zUP",
      uri: "spotify:track:76xNAVwiQccBXImICK5zUP"
    }

    return (
      <div>
        <NavBar />
        <h3>Welcome, {twitchLogin}</h3>
        <PlaylistDropdown />
        {
          !this.props.spotifyId
            ? <div>
                <h1>Connect your spotify account</h1>
                <a href="/auth/spotify">Connect</a>
              </div>
            : <div>
                <h1>Connected to your Spotify account: {this.props.spotifyId}</h1>
                <Button
                  onClick={() => this.props.playTrack(fakeTrack)}
                >
                  Play Track
                </Button>
              </div>
        }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('state', state)
  return {
    userId: state.user.id,
    twitchLogin: state.user.twitchLogin,
    spotifyId: state.user.spotifyId,
    votecycle: state.votecycle,
    numChoices: 3,
  }
}

const mapDispatch = dispatch => {
  return {
    activeVotecycle: (userId) => dispatch(getActiveVotecycleServer(userId)),
    createActiveVotecycle: (userId) => dispatch(createActiveVotecycleServer(userId)),
    createVotechoice: (votecycleId) => dispatch(createVotechoiceServer(votecycleId)),
    playTrack: (track) => dispatch(playTrack(track))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

