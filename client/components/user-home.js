'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import Dashboard from './dashboard'
import SidebarItem from './sidebar-item'
import NavBar from './navbar'
import styled from 'styled-components'
import { allModules } from '../allModules'
import { Image, Sidebar, Segment, Menu, Grid } from 'semantic-ui-react'
import WelcomeText from './welcome-text'
import { toggleModuleServer, getModulesServer } from '../store'

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
  align-items: center;
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

  toggleModule = (event) => {
    this.props.toggleModuleServerProps(event)
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
            vertical
            visible
            width='thin'
          >
           <Menu.Item as='a'>
              <Image src='/images/navbarlogo.png' />
            </Menu.Item>
          {
          Object.keys(allModules).map(id => {
            return <SidebarItem key={id} name={allModules[id].name} image={allModules[id].image} value={id} onClick={this.toggleModule} />
          })
          }
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <WelcomeTextStyle>
                <WelcomeText />
              </WelcomeTextStyle>
              <ModuleWrapper>
                    <Dashboard />
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

const mapDispatch = dispatch => {
  return {
    toggleModuleServerProps: moduleId => dispatch(toggleModuleServer(moduleId)),
    getModulesServerProps: () => dispatch(getModulesServer())
  }
}


export default connect(mapState, mapDispatch)(UserHome)

