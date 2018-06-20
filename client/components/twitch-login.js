'use strict'

import React from 'react'
import { Card, Button, Icon, Image, Grid } from 'semantic-ui-react'
import styled from 'styled-components'

const Wrapper = styled.div`
display: flex;
justify-content: center;
text-align: center;
align-items: center;
margin-top: 10%;
`

// const style = {
//   display: flex;
//   justify-content: center;
//   text-align: center;
// }

const TwitchLogin = props => {
  const {email, twitchLogin} = props
  return (
    <Wrapper>
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
    </Wrapper>
  )
}

export default TwitchLogin



