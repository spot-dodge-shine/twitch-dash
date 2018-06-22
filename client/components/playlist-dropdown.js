'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Card, Icon, Dropdown, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { getPlaylistsFromSpotify, selectPlaylist } from '../store/spotify-playlists'
import { getTracksFromSpotify, playTrack } from '../store/spotify-tracks'

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

  handlePlay = async () => {
    const tracks = Object.values(this.props.tracks)
    const randomTrackIndex = Math.floor(Math.random() * tracks.length)
    const trackToPlay = tracks[randomTrackIndex]
    await this.props.playTrack(trackToPlay)
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
              <Button
                onClick={this.handlePlay}
              >
                Play Random Song
              </Button>
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
    tracks: state.tracks,
    currentlyPlaying: () => {
      return Object.values(state.tracks)
        .filter(track => track.id === state.currentlyPlayingId)[0]
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPlaylists: () => dispatch(getPlaylistsFromSpotify()),
    selectPlaylist: playlistId => dispatch(selectPlaylist(playlistId)),
    getTracks: playlist => dispatch(getTracksFromSpotify(playlist)),
    playTrack: track => dispatch(playTrack(track))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDropdown)
