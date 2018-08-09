import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store'
import { Image, Button, Icon, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

const LogoStyle = styled.div`
  max-width: 150px;
  margin-right: 10px;
  margin-bottom: 1px;
`

const NavbarBottomMargin = styled.div`
  margin-bottom: 0;
  height: 5%;
`

const Navbar = (props) => {
  const { handleLogout, handleSidebarToggle } = props

  return (
    <NavbarBottomMargin>
      <Menu
        borderless
        attached='top'
      >
        <Menu.Item>
          <Button
            icon
            color='blue'
            onClick={handleSidebarToggle}
          >
            <Icon
              name='bars'
              size='large'
            />
          </Button>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <LogoStyle>
              <Link to="/home"><Image src='/images/navbarlogo.png' /></Link>
            </LogoStyle>
          </Menu.Item>
          <Menu.Item>
            <Button color='blue' animated onClick={handleLogout}>
              <Button.Content hidden>Logout</Button.Content>
              <Button.Content visible>
                <Icon name='log out' />
              </Button.Content>
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </NavbarBottomMargin>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
