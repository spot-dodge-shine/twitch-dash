'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import PlaylistDropdown from './spotify-module'
import SpotifyLogin from './spotify-login'
import NavBar from './navbar'
import styled from 'styled-components'
import { Message } from 'semantic-ui-react'
import WelcomeText from './welcome-text'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-top: 3%;
`

const WelcomeTextStyle = styled.div`
  display: flex;
  justify-content: center;
  aligh-items: center;
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
        <WelcomeTextStyle>
          <WelcomeText />
        </WelcomeTextStyle>
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

