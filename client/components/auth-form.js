import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    // <div>
    //   <form onSubmit={handleSubmit} name={name}>
    //     <div>
    //       <label htmlFor="email">
    //         <small>Email</small>
    //       </label>
    //       <input name="email" type="text" />
    //     </div>
    //     <div>
    //       <label htmlFor="password">
    //         <small>Password</small>
    //       </label>
    //       <input name="password" type="password" />
    //     </div>
    //     <div>
    //       <button type="submit">{displayName}</button>
    //     </div>
    //     {error && error.response && <div> {error.response.data} </div>}
    //   </form>
    //   <a href="/auth/google">{displayName} with Google</a>
    //   <a href="/auth/twitch">{displayName} with Twitch</a>
    // </div>
    <div>
      <div>
        <div id="login">
          <h1>Log in to twitch</h1>
          <a href="/auth/twitch">Log in</a>
          {
            props.user && props.user.twitchId
              ? <div>
                  <h1>Connect your spotify account</h1>
                  <a href="/auth/spotify">Log in</a>
                </div>
              : <div />
          }
        </div>
        <div id="loggedin" />
      </div>

      <script id="loggedin-template" type="text/x-handlebars-template">
          <h1>Logged in as </h1>
          <img id="avatar" width="200" src="" />
          <dl>
            <dt>Display name</dt><dd />
            <dt>Username</dt><dd />
            <dt>Email</dt><dd />
            <dt>Spotify URI</dt><dd><a href="" /></dd>
            <dt>Link</dt><dd><a href="" /></dd>
            <dt>Profile Image</dt><dd />
          </dl>
          <p><a href="/">Log in again</a></p>
      </script>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
