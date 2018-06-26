import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'

const SidebarItem = (props) => {
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

export default SidebarItem
