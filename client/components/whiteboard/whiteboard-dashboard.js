'use strict'

import React, { Component } from 'react'
import { Header, Button } from 'semantic-ui-react'
import { Slider } from 'react-semantic-ui-range'
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
      color: 'rgba(0,0,0,1)',
      lineWidth: 3
    }
  }

  componentDidMount () {
    this.ctx = this.canvas.getContext('2d')
    this.canvas.addEventListener('click', this.handleMouseclick)
    this.canvas.addEventListener('mousedown', this.handleMousedown)
    this.canvas.addEventListener('mousemove', this.handleMousemove)
  }

  handleMouseclick = evt => {
    this.currentMousePosition = this.pos(evt)
    this.lastMousePosition = [this.currentMousePosition[0]+1,this.currentMousePosition[1]]
    this.draw(this.lastMousePosition, this.currentMousePosition, this.state.color, true)
  }

  handleMousedown = evt => {
    this.currentMousePosition = this.pos(evt)
  }

  handleMousemove = evt => {
    if (!evt.buttons) return
    this.lastMousePosition = this.currentMousePosition
    this.currentMousePosition = this.pos(evt)
    this.lastMousePosition && this.currentMousePosition &&
        this.draw(
          this.lastMousePosition,
          this.currentMousePosition,
          this.state.color,
          this.state.lineWidth,
          true
        )
  }

  componentWillUnmount () {
    this.canvas.addEventListener('click', this.handleMouseclick)
    this.canvas.removeEventListener('mousedown', this.handleMousedown)
    this.canvas.removeEventListener('mousemove', this.handleMousemove)
  }

  pos = evt => {
    return [
      evt.layerX,
      evt.layerY
    ]
  }

  draw = (start, end, strokeColor='black', lineWidth, shouldBroadcast=true) => {
    this.ctx.beginPath()
    this.ctx.strokeStyle = strokeColor
    this.ctx.lineWidth = lineWidth
    this.ctx.moveTo(...start)
    this.ctx.lineTo(...end)
    this.ctx.closePath()
    this.ctx.stroke()

    const roomName = `/overlay/${this.props.userId}/2`

    shouldBroadcast &&
        events.emit('draw', start, end, strokeColor, lineWidth, roomName);
  }

  handleColorChange = (color) => {
    const formattedColor = `rgba(${Object.values(color.rgb)})`
    this.setState({ color: formattedColor })
  }

  handleClear = () => {
    this.ctx.clearRect(0, 0, 880, 495)
    events.emit('clear', `/overlay/${this.props.userId}/2`)
  }

  handleFill = () => {
    this.ctx.fillStyle = this.state.color
    this.ctx.fillRect(0, 0, 880, 495)
    events.emit('fill', this.state.color, `/overlay/${this.props.userId}/2`)
  }

  render() {
    const { lineWidth } = this.state

    return (
      <div style={{ margin: '20px' }}>
          <Header as='h3'>
            Whiteboard
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
              width='880px'
              height='495px'
              className='canvas-display'
            />
            <div>
              <SketchPicker
                color={ this.state.color }
                onChangeComplete={ this.handleColorChange }
                width='276px'
                presetColors={
                  ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33',
                  '#0C797D']
                }
              />
              <strong>Line Width</strong> {lineWidth}px
              <Slider
                color='blue'
                inverted={false}
                settings={{
                  start: lineWidth,
                  min:1,
                  max:10,
                  step:1,
                  onChange: (value) => {
                    this.setState({ lineWidth: value })
                }
              }}/>
              <div
                style={{
                  marginTop: '.75rem',
                  float: 'right'
                }}
              >
                <Button
                  content='fill background'
                  onClick={this.handleFill}
                />
                <Button
                  content='clear'
                  onClick={this.handleClear}
                />
              </div>
            </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapStateToProps)(WhiteboardDash)
