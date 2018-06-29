'use strict'

import React, {Component} from 'react'
import { Menu, Icon } from 'semantic-ui-react'

class SidebarItem extends Component {
  constructor (props){
    super(props)
  }

  state = {
    active: true
  }

  handleClick = () => {
    this.props.onClick(this.props.value)
    if (this.state.active === true) {
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
        <Icon color='blue' name='spotify' />
          <div className="sidebar-text">
            {this.props.name}
          </div>
        </Menu.Item>
    )
  }
}

export default SidebarItem
