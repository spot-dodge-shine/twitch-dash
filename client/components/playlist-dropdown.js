'use strict'

import React from 'react'
import { Card, Dropdown, Button } from 'semantic-ui-react'
import styled from 'styled-components'

const YourPlaylistText = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
`

const DropDownStyle = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 5%
`

const ButtonStyle = styled.div`
  margin-bottom: 5%;
`

const PlaylistDropdown = props => {
  const { trackData, handleChange, handlePlay, selectedPlaylistName } = props

  return (
    <Card.Header>
      <YourPlaylistText>
        <h3>Your Spotify Playlists</h3>
      </YourPlaylistText>
      <DropDownStyle>
        <Dropdown
          button={true}
          placeholder={selectedPlaylistName ? selectedPlaylistName : 'Select a Playlist'}
          fluid
          search
          selection
          options={trackData}
          onChange={handleChange}
        />
      </DropDownStyle>
      <ButtonStyle>
        <Button onClick={handlePlay}>
          Play Song and Start Poll
        </Button>
      </ButtonStyle>
    </Card.Header>
  )
}


export default PlaylistDropdown
