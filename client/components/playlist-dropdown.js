'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Icon, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import { getPlaylistsFromSpotify, selectPlaylist } from '../store/spotify-playlists'
import { getTracksFromSpotify } from '../store/spotify-tracks'

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

  constructor(props) {
    super(props)
    if (this.props.user.spotifyAccessToken) {
      this.props.getPlaylists()
    }
  }

  handleChange = async (evt, data) => {
    await this.props.selectPlaylist(data.value)
    return this.props.getTracks(this.props.selectedPlaylist())
  }

  render () {

    const trackData = Object.values(this.props.playlists)
      .map(playlist => ({
        key: playlist.id,
        value: playlist.id,
        text: playlist.name
      }))

    return (
      <div>
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
                  onChange={this.handleChange}
                />
              </DropDownStyle>
            </Card.Header>
            <Card.Content extra>
              <a>
                <Icon name='spotify' />
                {trackData.length} Playlists
              </a>
            </Card.Content>
          </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    playlists: state.playlists,
    selectedPlaylist: () => {
      return Object.values(state.playlists)
        .filter(playlist => playlist.id === state.selectedPlaylistId)[0]
    },
    tracks: state.tracks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPlaylists: () => dispatch(getPlaylistsFromSpotify()),
    selectPlaylist: playlistId => dispatch(selectPlaylist(playlistId)),
    getTracks: playlist => dispatch(getTracksFromSpotify(playlist))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDropdown)
