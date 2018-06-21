import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import NavBar from './navbar'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {twitchLogin} = props

  return (
    <div>
      <NavBar />
      <h3>Welcome, {twitchLogin}</h3>
      {
        props.twitchLogin
          ? <div>
              <h1>Connect your spotify account</h1>
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

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
