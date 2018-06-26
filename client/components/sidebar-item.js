'use strict'

import React, {Component} from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import axios from 'axios'

class SidebarItem extends Component {
  constructor (props){
    super(props)
  }

  handlePost = () => {
    return axios.post('api/users/me/modules', { moduleId: 1 })
  }
  render(){
    return (
      <div>
        <Menu.Item as='a'>
          <Icon color='blue' id={props.id} />
            <div className="sidebar-text">
              {props.name}
            </div>
          </Menu.Item>
      </div>
    )
  }
}

export default SidebarItem
