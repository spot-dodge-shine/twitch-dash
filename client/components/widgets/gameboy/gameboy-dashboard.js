'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Header, Input } from 'semantic-ui-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { EventEmitter } from 'events'
export const gameboyEvents = new EventEmitter()

class GameboyDash extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isPlaying: false
    }
  }

  handleFile = files => {
    const { userId } = this.props
    const reader = new FileReader()
    reader.onload = function (evt) {
      const arrayBuffer = evt.target.result
      const array = new Uint8Array(arrayBuffer)
      const charArray = []
      array.forEach(elem => {
        charArray.push(String.fromCharCode(elem))
      })
      const binaryString = charArray.join('')
      gameboyEvents.emit('load-file', userId, files[0].name, binaryString)
    }
    reader.readAsArrayBuffer(files[0])
    this.setState({ isPlaying: true })
  }

  handlePauseResume = userId => {
    gameboyEvents.emit('pause-resume', userId)
    this.setState(prevState => ({ isPlaying: !prevState.isPlaying }))
  }

  render () {
    const { userId } = this.props

    return (
      <Card style={{ width: '425px' }}>
        <Card.Content>
          <Header
            as='h3'
          >
            Gameboy Emulator
          </Header>
          <p>By using this emulator, you are acknowledging that you own a physical copy of the game cartridge.</p>
          <Input
            type='file'
            accept='.gb'
            onChange={ evt => this.handleFile(evt.target.files) }
          />
          <p>Select a game above</p>
          <div>
            <CopyToClipboard
              text={`${window.location.origin}/overlay/${userId}/2`}
            >
              <Button
                content='Link'
              />
            </CopyToClipboard>
            <Button
              content={ this.state.isPlaying ? 'Pause' : 'Play' }
              onClick={ () => this.handlePauseResume(userId) }
            />
            <Button
              content='Reset'
              onClick={ () => gameboyEvents.emit('reset', userId) }
            />
          </div>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToDispatch = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapStateToDispatch)(GameboyDash)
