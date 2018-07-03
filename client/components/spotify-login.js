'use strict'

import React from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'

const SpotifyLogin = () => {
  return (
    <Card style={{
      width: '425px',
      marginTop: '1rem',
      marginBottom: '1rem'
    }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '1.5rem',
          marginBottom: '1.5rem'
        }}
      >
        <Icon
          name='spotify'
          color='blue'
          size='huge'
        />
        <a href="/auth/spotify">
          <Button primary floated='right'>
            <Button.Content>
              Connect to Spotify
            </Button.Content>
          </Button>
        </a>
      </div>
    </Card>
  )
}

export default SpotifyLogin
