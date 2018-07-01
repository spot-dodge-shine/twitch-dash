'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Card, Button, Header } from 'semantic-ui-react'
import { EventEmitter } from 'events'
export const gameboyEvents = new EventEmitter()

const GameboyDash = ({ userId }) => {
  return (
    <Card style={{ width: '425px' }}>
      <Card.Content>
        <Header
          as='h3'
        >
          Gameboy Emulator
        </Header>
        <p>By using this emulator, you are acknowledging that you own a physical copy of the game cartridge.</p>
        <Button
          content='Open'
          onClick={ () => window.open(`/overlay/${userId}/3`)}
        />
        <Button
          content='Test'
          onClick={ () => gameboyEvents.emit('test', userId)}
        />
      </Card.Content>
    </Card>
  )
}

const mapStateToDispatch = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapStateToDispatch)(GameboyDash)
