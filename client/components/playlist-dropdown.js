'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Card, Icon, Dropdown, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { getPlaylistsFromSpotify, selectPlaylist } from '../store/spotify-playlists'
import { getTracksFromSpotify, playTrack } from '../store/spotify-tracks'
import {getActiveVotecycleServer, createVotechoiceServer, createActiveVotecycleServer, getVotesServer, deactivateVotecycleServer} from '../store/votecycle'
import { getPlayerStatusThunk } from '../store/spotify-player'

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
        // .then(() => {
        //   return this.props.selectPlaylist(Object.keys(this.props.playlists)[0])
        // })
        // .then(() => {
        //   return this.props.getTracks(this.props.selectedPlaylist())
        // })
        .then(() => {
          this.timer = setInterval(this.tick, 5000)
          this.counter = 0
          this.props.activeVotecycle(this.props.user.id)
            .then(() => {
              this.tick()
            })
        })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = async () => {
    this.counter += 1
    if (!this.props.selectedPlaylistId) { console.log('no playlist selected') }
    else if (!this.props.votecycle || !this.props.votecycle.active) {
      await this.props.createActiveVotecycle(this.props.user.id)
      let choiceArr = []
      const tracks = Object.values(this.props.tracks)
      let myTrack, trackInd
      for (let i = 0; i < this.props.numChoices; i++) {
        trackInd = Math.floor(Math.random() * tracks.length)
        myTrack = tracks[trackInd]
        choiceArr.push(this.props.createVotechoice(this.props.votecycle.id, i + 1, myTrack) )
      }
      return Promise.all(choiceArr)      
    } else {
      await this.props.getVotes(this.props.votecycle)
      await this.props.getPlayerStatus()
      if (!this.props.playerStatus.isPlaying && !this.props.playerStatus.progress) {
        let newTrack
        let maxVotes = 0
        this.props.votecycle.votechoices.forEach(votechoice => {
          if (votechoice.votes >= maxVotes) {
            newTrack = votechoice.track
            maxVotes = votechoice.votes
          }
        })
        console.log(newTrack)
        await this.props.deactivateVotecycle(this.props.votecycle.id)
        return this.props.playTrack(newTrack)
      }
    }
  }

  handleChange = async (evt, data) => {
    await this.props.selectPlaylist(data.value)
    await this.props.getTracks(this.props.selectedPlaylist())
    if (this.props.votecycle && this.props.votecycle.id) {
      await this.props.deactivateVotecycle(this.props.votecycle.id)
    }
    await this.props.createActiveVotecycle(this.props.user.id)
    let choiceArr = []
    const tracks = Object.values(this.props.tracks)
    let myTrack, trackInd
    for (let i = 0; i < this.props.numChoices; i++) {
      trackInd = Math.floor(Math.random() * tracks.length)
      myTrack = tracks[trackInd]
      choiceArr.push(this.props.createVotechoice(this.props.votecycle.id, i + 1, myTrack) )
    }
    return Promise.all(choiceArr)  
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
    spotifyId: state.user.spotifyId,
    twitchLogin: state.user.twitchLogin,
    votecycle: state.votecycle,
    numChoices: 3,
    playlists: state.playlists,
    selectedPlaylist: () => {
      return Object.values(state.playlists)
        .filter(playlist => playlist.id === state.selectedPlaylistId)[0]
    },
    selectedPlaylistId: state.selectedPlaylistId,
    tracks: state.tracks,
    playerStatus: state.playerStatus,
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
    playTrack: track => dispatch(playTrack(track)),
    activeVotecycle: (userId) => dispatch(getActiveVotecycleServer(userId)),
    createActiveVotecycle: (userId) => dispatch(createActiveVotecycleServer(userId)),
    createVotechoice: (votecycleId, enumId, track) => dispatch(createVotechoiceServer(votecycleId, enumId, track)),
    getVotes: (votecycle) => dispatch(getVotesServer(votecycle)),
    deactivateVotecycle: (votecycleId) => dispatch(deactivateVotecycleServer(votecycleId)),
    getPlayerStatus: () => dispatch(getPlayerStatusThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDropdown)
