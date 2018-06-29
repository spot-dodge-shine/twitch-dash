'use strict'

import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import clientSocket from '../../socket'

class WhiteboardOverlay extends Component {
  constructor(props) {
    super(props)
    this.canvas = null
    this.ctx = null
    this.setRef = elem => {
      this.canvas = elem
    }
  }

  componentDidMount () {
    this.ctx = this.canvas.getContext('2d')
  }

  draw = (start, end, strokeColor='black', lineWidth, shouldBroadcast=true) => {
    this.ctx.beginPath()
    this.ctx.strokeStyle = strokeColor
    this.ctx.lineWidth = lineWidth
    this.ctx.moveTo(...start)
    this.ctx.lineTo(...end)
    this.ctx.closePath()
    this.ctx.stroke()
  }

  handleClear = () => {
    this.ctx.clearRect(0, 0, 800, 500)
  }

  render() {
    clientSocket.on('draw-from-server', (start, end, strokeColor, lineWidth) => {
      this.draw(start, end, strokeColor, lineWidth)
    })

    clientSocket.on('clear-from-server', () => {
      this.handleClear()
    })

    return (
      <div style={{ margin: '20px' }}>
        <canvas
          ref={this.setRef}
          id='canvas'
          width='800px'
          height='500px'
        />
        </div>
    )
  }
}


export default WhiteboardOverlay
