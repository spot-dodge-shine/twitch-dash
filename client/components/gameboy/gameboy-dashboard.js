'use strict'

import React, { Component } from 'react'

class GameboyDash extends Component {
  constructor(props) {
    super(props)
    // this.loadScript('https://unpkg.com/node-gameboy/dist/gameboy.min.js')
    // this.loadScript('/gameboy/gameboy.min.js')
  }

  loadScript = src => {
    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    document.getElementsByTagName('body')[0].appendChild(tag);
  }

  componentDidMount() {
    console.log(window)
  }

  render () {

    return (
      <div>
        <h3>hi</h3>
        <canvas id="frame" width="160" height="144"></canvas>
      </div>
    )
  }
}

export default GameboyDash
