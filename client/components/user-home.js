import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import PlaylistDropdown from './playlist-dropdown'
<<<<<<< HEAD
import NavBar from './navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'semantic-ui-react'
=======
import SpotifyLogin from './spotify-login'
import NavBar from './navbar'
import styled from 'styled-components'
>>>>>>> 38ed98810d5e0c7d8a7a2d12d73186c468ce2008
import {getActiveVotecycleServer, createVotechoiceServer, createActiveVotecycleServer} from '../store/votecycle'
import { playTrack } from '../store/spotify-tracks'

const Wrapper = styled.div`
display: flex;
justify-content: center;
text-align: center;
align-items: center;
margin-top: 10%;
`

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
<<<<<<< HEAD
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
=======
        <Wrapper>
          {
            this.props.spotifyId
            ? <PlaylistDropdown />
            : <SpotifyLogin />
          }
        </Wrapper>
>>>>>>> 38ed98810d5e0c7d8a7a2d12d73186c468ce2008
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    spotifyId: state.user.spotifyId,
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

