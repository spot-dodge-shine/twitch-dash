'use strict'

import React from 'react'
import {connect} from 'react-redux'
import SpotifyModule from './spotify-module'
import SpotifyLogin from './spotify-login'

const SpotifyDashboard = (props) => {
  if (props.spotifyId) {
    return <SpotifyModule />
  } else {
    return <SpotifyLogin />
  }
}

const mapState = state => {
  return {
    spotifyId: state.user.spotifyId
  }
}

export default connect(mapState)(SpotifyDashboard)
