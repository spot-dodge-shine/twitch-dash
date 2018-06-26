'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import SpotifyModule from './spotify-module'
import SpotifyLogin from './spotify-login'
import NavBar from './navbar'
import styled from 'styled-components'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar, Dropdown } from 'semantic-ui-react'
import WelcomeText from './welcome-text'
import TempButtons from './tempRouteTesting'
import axios from 'axios'

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

const BodyWrapper = styled.div`
  margin-top: 0%;
  height: 100%;
`

const MenuHeight = styled.div`
  height: 100%;
`

class UserHome extends Component {
  constructor(props) {
    super(props)
  }

  handlePost = () => {
    return axios.post('api/users/me/modules', { moduleId: 1 })
  }

  render() {

    return (
      <BodyWrapper>
        <MenuHeight>
        <Sidebar.Pushable as={Segment}>
        <NavBar />
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            onHide={this.handleSidebarHide}
            vertical
            visible
            width='thin'
          >
            <Menu.Item as='a'>
              <Image src='/images/navbarlogo.png' />
            </Menu.Item>
            <Menu.Item as='a' onClick={this.handlePost}>
              <Icon color='blue' name='spotify' />
              <div className="sidebar-text">
                Spotify
              </div>
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon color='blue' name='twitch' />
              <div className="sidebar-text">
                Twitch
              </div>
            </Menu.Item>
            <Menu.Item>
              <Icon color='blue' name='paypal' />
                <div className="sidebar-text">
                  PayPal
                </div>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
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
        </MenuHeight>
      </BodyWrapper>
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

