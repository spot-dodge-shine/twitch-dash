'use strict'

import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { SketchPicker } from 'react-color'
import { EventEmitter } from 'events'
export const events = new EventEmitter()

class WhiteboardDash extends Component {
  constructor(props) {
    super(props)
    this.canvas = null
    this.ctx = null
    this.setRef = elem => {
      this.canvas = elem
    }
    this.currentMousePosition = [ 0, 0 ]
    this.lastMousePosition = [ 0, 0 ]
    this.state = {
      color: {
        r: '0',
        g: '0',
        b: '0',
        a: '1',
      }
    }
  }

  componentDidMount () {
    this.ctx = this.canvas.getContext('2d')

    this.canvas.addEventListener('mousedown', evt => {
      this.currentMousePosition = this.pos(evt)
    })

    this.canvas.addEventListener('mousemove', evt => {
      if (!evt.buttons) return
      this.lastMousePosition = this.currentMousePosition
      this.currentMousePosition = this.pos(evt)
      this.lastMousePosition && this.currentMousePosition &&
          this.draw(this.lastMousePosition, this.currentMousePosition, this.state.color, true)
    })
  }

  pos = evt => {
    return [
      evt.pageX - this.canvas.offsetLeft,
      evt.pageY - this.canvas.offsetTop
    ]
  }

  draw = (start, end, strokeColor='black', shouldBroadcast=true) => {
    let colorStr = `rgba(${Object.values(strokeColor)})`
    this.ctx.beginPath()
    this.ctx.strokeStyle = colorStr
    this.ctx.lineWidth = 3
    this.ctx.moveTo(...start)
    this.ctx.lineTo(...end)
    this.ctx.closePath()
    this.ctx.stroke()

    // If shouldBroadcast is truthy, we will emit a draw event to listeners
    // with the start, end and color data.
    // shouldBroadcast &&
    //     events.emit('draw', start, end, strokeColor);
  }

  handleChangeComplete = (color) => {
    this.setState({ color: color.rgb })
  };

  render() {
    return (
      <div style={{ margin: '20px' }}>
          <Header as='h3'>
            {this.props.twitchLogin}'s Whiteboard
            <Header.Subheader>
              Draw something to be displayed on stream!
            </Header.Subheader>
          </Header>
          <div
            style={{
              display: 'flex',
              direction: 'row',
            }}
          >
            <canvas
              ref={this.setRef}
              id='canvas'
              width='700px'
              height='450px'
              style={{
                border: '1px solid rgba(0,0,0,.6)',
                borderRadius: '.25rem'
              }}
            />
            <SketchPicker
              color={ this.state.color }
              onChangeComplete={ this.handleChangeComplete }
            />
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    twitchLogin: state.user.twitchLogin
  }
}

export default connect(mapStateToProps)(WhiteboardDash)
