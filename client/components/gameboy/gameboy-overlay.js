'use strict'

import React, { Component } from 'react'
import GameboyContent from './gameboy-content'

class GameboyOverlay extends Component {
  constructor() {
    super()
    this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js')
    this.loadScript('https://unpkg.com/node-gameboy/dist/gameboy.min.js')
    this.loadScript('/gameboy/app.js')
  }

  loadScript = src => {
    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    document.getElementsByTagName('body')[0].appendChild(tag);
  }

  render () {
    return (
      <GameboyContent />
    )
  }
}

export default GameboyOverlay
