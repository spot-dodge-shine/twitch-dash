'use strict'

import React from 'react'
import { Card, Icon, Dropdown, Button } from 'semantic-ui-react'
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
  const { playlists, handleChange, handlePlay } = props

  const trackData = Object.values(playlists)
    .map(playlist => ({
      key: playlist.id,
      value: playlist.id,
      text: playlist.name
    }))

  return (
    <Card>
      <Card.Header>
        <YourPlaylistText>
          <h3>Your Spotify Playlists</h3>
        </YourPlaylistText>
        <DropDownStyle>
          <Dropdown
            button={true}
            placeholder='Select a Playlist'
            fluid
            search
            selection
            options={trackData}
            onChange={handleChange}
          />
        </DropDownStyle>
        <ButtonStyle>
          <Button onClick={handlePlay}>
            Play Random Song
          </Button>
        </ButtonStyle>
      </Card.Header>
      <Card.Content extra>
        <a>
          <Icon name='spotify' />
          {trackData.length} Playlists
        </a>
      </Card.Content>
    </Card>
  )
}

export default PlaylistDropdown
