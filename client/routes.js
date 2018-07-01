'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { UserHome, TwitchLogin, Dashboard, OverlayModule } from './components'
import { me } from './store'
import GameboyDash from './components/gameboy/gameboy-dashboard'
import GameboyContainer from './components/gameboy/gameboy-container'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div className='routes-height'>
        <Switch>
          <Route exact path="/" component={TwitchLogin} />
          <Route exact path="/overlay/:userId/:moduleId" component={OverlayModule} />
          {isLoggedIn && (
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/home" component={UserHome} />
            </Switch>
          )}
          <Route component={TwitchLogin} />
        </Switch>
        <Route exact path="/test" component={GameboyContainer} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
