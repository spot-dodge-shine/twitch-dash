import React from 'react'
import {Card, Item, Button, Icon, Grid, Image, Dropdown, Menu} from 'semantic-ui-react'
import styled from 'styled-components'

const Wrapper = styled.div`
display: flex;
justify-content: center;
text-align: center;
align-items: center;
margin-top: 5%;
`

const SpotifyLogo = styled.div`
  justify-content: center;
  max-width: 100px;
  margin-top: 10%;
  margin-left: 10%;
  margin-bottom: 10%;
`

const SpotifyButton = styled.div`
  margin-top: 18%;
  margin-right: 10%;
  margin-left: 10%;
`

const SpotifyLogin = () => {
  return (
    <Wrapper>
      <Menu>
        {/* Spotify image */}
        <Menu.Menu>
        <SpotifyLogo>
          <Image src='/images/spotifylogoblue.png' />
        </SpotifyLogo>
      </Menu.Menu>

      {/* Login to Spotify button */}
      <a href="/auth/spotify">
      <Menu.Menu position='right'>
        <SpotifyButton>
          <Button primary animated floated='right'>
            <Button.Content visible>
              Connect to Spotify
            </Button.Content>
            <Button.Content hidden>
              <Icon name='spotify' />
            </Button.Content>
          </Button>
        </SpotifyButton>
      </Menu.Menu>
      </a>
    </Menu>
   </Wrapper>
  )
}

export default SpotifyLogin
