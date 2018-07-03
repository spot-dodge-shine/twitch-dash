'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Card, Button, Icon, Image } from 'semantic-ui-react'
import styled from 'styled-components'

const Wrapper = styled.div`
display: flex;
justify-content: center;
text-align: center;
align-items: center;
height: 100%;
`

const TwitchDashLogo = styled.div`
margin-top: 4%;
margin-bottom: 5%;
`

const TwitchLogin = () => {

  return (
    <Wrapper className='landing-image'>
      <Card>
        <Card.Content>
          <Card.Header>
          <TwitchDashLogo>
            <Image src='/images/navbarlogo.png' />
          </TwitchDashLogo>
            {/* Welcome to twitch dash */}
          </Card.Header>
          <Card.Description>
            <a href="/auth/twitch">
              <Button primary animated>
              <Button.Content visible>Login with Twitch</Button.Content>
              <Button.Content hidden>
                <Icon name='twitch' />
              </Button.Content>
              </Button>
            </a>
          </Card.Description>
        </Card.Content>
      </Card>
    </Wrapper>
  )
}

const mapStateToProps = state => {
  return {
    twitchLogin: state.user.twitchLogin
  }
}

export default connect(mapStateToProps)(TwitchLogin)

