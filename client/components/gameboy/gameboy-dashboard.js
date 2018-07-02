'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Header, Input } from 'semantic-ui-react'
import { EventEmitter } from 'events'
export const gameboyEvents = new EventEmitter()

class GameboyDash extends Component {
  handleFile = file => {
    gameboyEvents.emit('load-file', this.props.userId, file)
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
            content='Select game'
            onChange={ evt => this.handleFile(evt.target.files) }
          />
          <div>
            <Button
              content='Open'
              onClick={ () => window.open(`/overlay/${userId}/3`) }
            />
            <Button
              content='Test'
              onClick={ () => gameboyEvents.emit('test', userId) }
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
