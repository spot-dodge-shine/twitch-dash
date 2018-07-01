'use strict'

import React, { Component } from 'react'
import GameboyContent from './gameboy-content'

class GameboyOverlay extends Component {
  constructor() {
    super()
    this.loadScript('https://unpkg.com/node-gameboy/dist/gameboy.min.js')
    this.loadScript('https://code.jquery.com/jquery-3.1.1.min.js')
    this.loadScript('/gameboy/examples/gh-pages/app.js')
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
