'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import PlaylistDropdown from './playlist-dropdown'
import SpotifyLogin from './spotify-login'
import NavBar from './navbar'
import {getActiveVotecycleServer, createVotechoiceServer, createActiveVotecycleServer, getVotesServer, deactivateVotecycleServer} from '../store/votecycle'
import styled from 'styled-components'
import { playTrack } from '../store/spotify-tracks'
import { getPlayerStatusThunk } from '../store/spotify-player'

const Wrapper = styled.div`
display: flex;
justify-content: center;
text-align: center;
align-items: center;
margin-top: 10%;
`

class UserHome extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {twitchLogin} = this.props

    return (
      <div>
        <NavBar />
        <h3>Welcome, {twitchLogin}</h3>
        <Wrapper>
          {
            this.props.spotifyId
            ? <PlaylistDropdown />
            : <SpotifyLogin />
          }
        </Wrapper>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    spotifyId: state.user.spotifyId,
    twitchLogin: state.user.twitchLogin,
  }
}

export default connect(mapState)(UserHome)

