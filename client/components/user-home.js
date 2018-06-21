import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
<<<<<<< HEAD
  const { twitchLogin } = props.user
  console.log(props.user)
=======
  const {email, twitchLogin} = props
>>>>>>> 6ae56fc5980d20474317645ec70ed68e3fa7c041

  return (
    <div>
      <h3>Welcome, {twitchLogin}</h3>
<<<<<<< HEAD
      {
        props.isLoggedIn
          ? <div>
              <h1>Connect your spotify account</h1>
              <a href="/auth/spotify">Connect</a>
            </div>
          : <div />
      }
=======
>>>>>>> 6ae56fc5980d20474317645ec70ed68e3fa7c041
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('state', state)
  return {
<<<<<<< HEAD
    user: state.user,
    isLoggedIn: !!state.user.id
=======
    email: state.user.email,
    twitchLogin: state.user.twitchLogin
>>>>>>> 6ae56fc5980d20474317645ec70ed68e3fa7c041
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
