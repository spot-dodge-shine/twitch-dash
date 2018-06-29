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
      color: {
        r: '0',
        g: '0',
        b: '0',
        a: '1',
      },
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
        this.draw(this.lastMousePosition, this.currentMousePosition, this.state.color, true)
  }

  componentWillUnmount () {
    this.canvas.removeEventListener('mousedown', this.handleMousedown)
    this.canvas.removeEventListener('mousemove', this.handleMousemove)
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
    this.ctx.lineWidth = this.state.lineWidth
    this.ctx.moveTo(...start)
    this.ctx.lineTo(...end)
    this.ctx.closePath()
    this.ctx.stroke()

    // If shouldBroadcast is truthy, we will emit a draw event to listeners
    // with the start, end and color data.
    // shouldBroadcast &&
    //     events.emit('draw', start, end, strokeColor);
  }

  handleColorChange = (color) => {
    this.setState({ color: color.rgb })
  }

  handleClear = () => {
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillRect(0,0,750,500)
  }

  render() {
    const { lineWidth } = this.state

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
              width='750px'
              height='500px'
              style={{
                border: 'none',
                borderRadius: '.28571429rem',
                marginRight: '2rem',
                boxShadow: '0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5',
                transition: 'box-shadow .1s ease,transform .1s ease,-webkit-box-shadow .1s ease,-webkit-transform .1s ease'
              }}
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
              <Button
                floated='right'
                content='clear'
                color='red'
                style={{ marginTop: '1rem' }}
                onClick={this.handleClear}
              />
            </div>
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
