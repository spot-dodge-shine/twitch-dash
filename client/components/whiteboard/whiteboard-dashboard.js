'use strict'

import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
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
    this.color = 'black'
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
          this.draw(this.lastMousePosition, this.currentMousePosition, this.color, true)
    })
    console.log(this.ctx)
  }

  pos = evt => {
    console.log('evt', evt.pageX)
    console.log('offsetLeft', this.canvas.offsetLeft)
    return [
      evt.pageX - this.canvas.offsetLeft,
      evt.pageY - this.canvas.offsetTop
    ]
  }

  draw = (start, end, strokeColor='black', shouldBroadcast=true) => {
    // Draw the line between the start and end positions
    // that is colored with the given color.
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeColor;
    this.ctx.moveTo(...start);
    this.ctx.lineTo(...end);
    this.ctx.closePath();
    this.ctx.stroke();

    // If shouldBroadcast is truthy, we will emit a draw event to listeners
    // with the start, end and color data.
    // shouldBroadcast &&
    //     events.emit('draw', start, end, strokeColor);
};

  // componentWillUpdate (nextProps, nextState) {
  //   console.log('current state', this.state)
  //   console.log('next state', nextState)
  // }

  render() {
    return (
      <div style={{ margin: '20px' }}>
        <Header as='h3'>
          {this.props.twitchLogin}'s Whiteboard
          <Header.Subheader>
            Draw something to be displayed on their stream!
          </Header.Subheader>
        </Header>
        <canvas
          ref={this.setRef}
          id='canvas'
          width='400px'
          height='400px'
          style={{ border: '1px solid black' }}
        />
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
