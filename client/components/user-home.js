import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { twitchLogin } = props.user

  return (
    <div>
      <h3>Welcome, {twitchLogin}</h3>
      {
        props.isLoggedIn
          ? <div>
              <h1>Connect your spotify account</h1>
              <a href="/auth/spotify">Log in</a>
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
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
