import React from 'react'
import {Button, Icon, Image, Menu} from 'semantic-ui-react'
import styled from 'styled-components'

const SpotifyLogo = styled.div`
  justify-content: center;
  max-width: 100px;
  margin-top: 20%;
  margin-left: 20%;
  margin-bottom: 20%;
`

const SpotifyButton = styled.div`
  margin-top: 21%;
  margin-right: 20%;
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
