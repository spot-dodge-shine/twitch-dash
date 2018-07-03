'use strict'

import React, {Component} from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getModulesServer, toggleModuleServer} from '../store'

class SidebarItem extends Component {
  constructor (props){
    super(props)
    this.state = {
      active: (this.props.modules.active.includes(Number(this.props.value)))
    }
  }

  handleClick = () => {
    this.props.onClick(this.props.value)
    if (this.state.active) {
      this.setState({
        active: false
      })
    } else {
      this.setState({
        active: true
      })
    }
  }

  render(){
    return (
      <Menu.Item as='a' active={this.state.active} onClick={this.handleClick}>
        <Icon color='blue' name={this.props.image} />
          <div className="sidebar-text">
            {this.props.name}
          </div>
      </Menu.Item>
    )
  }
}


const mapState = (state) => {
  return {
    modules: state.modules
  }
}

const mapDispatch = (dispatch) => {
  return {
    getModules: () => dispatch(getModulesServer()),
    toggleModule: (moduleId) => dispatch(toggleModuleServer(moduleId))
  }
}

export default connect(mapState, mapDispatch)(SidebarItem)
