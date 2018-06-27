'use strict'

import React, {Component} from 'react'
import { Menu, Icon } from 'semantic-ui-react'

class SidebarItem extends Component {
  constructor (props){
    super(props)
  }

  handleClick = () => {
    this.props.onClick(this.props.value)
  }

  render(){
    return (
      <Menu.Item as='a' onClick={this.handleClick}>
        <Icon color='blue' name='spotify' />
          <div className="sidebar-text">
            {this.props.name}
          </div>
        </Menu.Item>
    )
  }
}

export default SidebarItem
