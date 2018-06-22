'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Icon, Dropdown } from 'semantic-ui-react'
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

export class PlaylistDropdown extends Component {

  render () {
    const dummySongs = [
      {key: 0, value: '0', text:'My Beautiful Dark Twisted Fantasy'},
      {key: 1, value: '1', text:'Kids See Ghosts'},
      {key: 2, text:'ye'}
    ]

    return (
      <div>
          <Card>
            <Card.Header>
              <YourPlaylistText>
                <h3>Your Spotify Playlists</h3>
              </YourPlaylistText>
              <DropDownStyle>
                <Dropdown button='true' placeholder='Select a Playlist' fluid search selection options={dummySongs} />
              </DropDownStyle>
            </Card.Header>
            <Card.Content extra>
              <a>
                <Icon name='spotify' />
                {dummySongs.length} Playlists
              </a>
            </Card.Content>
          </Card>
      </div>
    )
  }
}

export default PlaylistDropdown /*connect(mapState, mapDispatch)(PlaylistDropdown)*/



