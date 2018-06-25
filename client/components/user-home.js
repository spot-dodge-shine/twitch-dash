'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import SpotifyModule from './spotify-module'
import SpotifyLogin from './spotify-login'
import NavBar from './navbar'
import styled from 'styled-components'
import { Sidebar, Segment, Menu, Button, Icon } from 'semantic-ui-react'
import WelcomeText from './welcome-text'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-top: 2%;
  margin-bottom: 2%;
`

const WelcomeTextStyle = styled.div`
  display: flex;
  justify-content: center;
  aligh-items: center;
  margin-top: 3%;
`

class UserHome extends Component {
  constructor(props) {
    super(props)
  }


  render() {

    return (
      <div>
        <NavBar />
        <WelcomeTextStyle>
          <WelcomeText />
        </WelcomeTextStyle>
        <Wrapper>
          {
            this.props.spotifyId
            ? <SpotifyModule />
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

