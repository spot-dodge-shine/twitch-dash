import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {PlaylistDropdown} from './playlist-dropdown'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, twitchLogin} = props

  return (
    <div>
      <h3>Welcome, {twitchLogin}</h3>
      <PlaylistDropdown />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('state', state)
  return {
    email: state.user.email,
    twitchLogin: state.user.twitchLogin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
