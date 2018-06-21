import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {PlaylistDropdown} from './playlist-dropdown'
import NavBar from './navbar'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {twitchLogin} = props
  console.log('TEST', props)
  return (
    <div>
      <NavBar />
      <h3>Welcome, {twitchLogin}</h3>
      <PlaylistDropdown />
      {
        props.twitchLogin
          ? <div>
              <h3>Connect Your Spotify Account</h3>
              <a href="/auth/spotify">Connect</a>
            </div>
          : <div />
      }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('state', state)
  return {
    twitchLogin: state.user.twitchLogin
  }
}

export default connect(mapState)(UserHome)

