'use strict'

import React, { Component } from 'react'
import axios from 'axios'

export default class GameboyContent extends Component {
  constructor() {
    super()
    this.state = {
      __html: ''
    }

    axios.get('/gameboy/index.html')
      .then(res => {
        return res.data
      })
      .then(content => {
        this.setState({
          __html: content
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.state} />
    )
  }
}
