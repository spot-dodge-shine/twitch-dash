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
import '../socket'

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

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibility: false
    }
    // this.props.getModulesServerProps()
  }

  handleSidebarToggle = () => {
    this.setState(prevState => ({ visibility: !prevState.visibility }))
  }

  toggleModule = (event) => {
    this.props.toggleModuleServerProps(event)
  }

  componentDidMount () {
    this.props.getModulesServerProps()
  }

  render() {
    return (
      <BodyWrapper>
        <NavBar handleSidebarToggle={this.handleSidebarToggle} />
        <Sidebar.Pushable
          as={Segment}
          attached='bottom'
        >
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            vertical
            visible={this.state.visibility}
            width='thin'
          >
          { 
            Object.keys(allModules).map(id => {
              return <SidebarItem key={id} name={allModules[id].name} image={allModules[id].image} value={id} onClick={this.toggleModule} />
            }) 
          }
          </Sidebar>

          <Sidebar.Pusher>
            <WelcomeTextStyle>
              <WelcomeText />
            </WelcomeTextStyle>
            <ModuleWrapper>
              <Dashboard />
            </ModuleWrapper>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </BodyWrapper>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    spotifyId: state.user.spotifyId,
    twitchLogin: state.user.twitchLogin,
    modules: state.modules
  }
}

const mapDispatch = dispatch => {
  return {
    toggleModuleServerProps: moduleId => dispatch(toggleModuleServer(moduleId)),
    getModulesServerProps: () => dispatch(getModulesServer()),
  }
}


export default connect(mapState, mapDispatch)(UserHome)

