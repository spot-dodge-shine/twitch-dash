'use strict'

import React, {Component} from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'

class SidebarItem extends Component {

  handleClick = () => {
    this.props.onClick(this.props.value)
  }

  render() {
    return (
      <Menu.Item as='a' active={(this.props.active.includes(Number(this.props.value)))} onClick={this.handleClick}>
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
    active: state.modules.active,
    deactivated: state.modules.deactivated
  }
}

export default connect(mapState)(SidebarItem)
