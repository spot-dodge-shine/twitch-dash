'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import SpotifyModule from './spotify-module'
import SpotifyLogin from './spotify-login'
import NavBar from './navbar'
import styled from 'styled-components'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import WelcomeText from './welcome-text'

const ModuleWrapper = styled.div`
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

const MainBodyWrapper = styled.div`
  height: 100%
`

class UserHome extends Component {
  constructor(props) {
    super(props)
  }
  state = { visible: false }

  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state

    return (
      <MainBodyWrapper>
        <NavBar />
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='spotify' />
              Spotify
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='twitch' />
              Twitch
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='paypal' />
              PayPal
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
            <Button onClick={this.handleButtonClick}>Toggle visibility</Button>
              <WelcomeTextStyle>
                <WelcomeText />
              </WelcomeTextStyle>
              <ModuleWrapper>
                {
                  this.props.spotifyId
                  ? <SpotifyModule />
                  : <SpotifyLogin />
                }
              </ModuleWrapper>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </MainBodyWrapper>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    spotifyId: state.user.spotifyId,
    twitchLogin: state.user.twitchLogin,
  }
}

export default connect(mapState)(UserHome)

