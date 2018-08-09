'use strict'

import React, {Component} from 'react'
import { Message, Transition } from 'semantic-ui-react'
import {connect} from 'react-redux'

class WelcomeText extends Component {
  state = {
    visible: true,
    animation: 'fade up',
    duration: 500
  }

  handleChange = (e, { name, value }) => this.setState({ visible: false, [name]: value})

  handleDismiss = () => {
    this.setState({ visible: false })
  }

  render() {
    const {twitchLogin} = this.props

    if (this.state.visible) {
      return (
        <Message
        floating
        onDismiss={this.handleDismiss}
        header={`Welcome, ${twitchLogin}!`}
        />
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }
}

const mapState = state => {
  return {
    twitchLogin: state.user.twitchLogin
  }
}


export default connect(mapState, null)(WelcomeText)
