'use strict'

import React from 'react'
import { Card, Button, Icon, Image } from 'semantic-ui-react'

const TwitchLogin = props => {
  const {email, twitchLogin} = props
  return (
    <div>
      <Card>

        <Card.Content>
          <Card.Header>
          <Image src='/images/twitchbuddylogo.png' />
            Welcome to twitch dash
          </Card.Header>
          <Card.Description>
            <a href="/auth/twitch">
              <Button color='primary' animated>
              <Button.Content visible>Login with twitch</Button.Content>
              <Button.Content hidden>
                <Icon name='sign in' />
              </Button.Content>
              </Button>
            </a>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  )
}

export default TwitchLogin



