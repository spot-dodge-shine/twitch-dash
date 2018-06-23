'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Card, Icon, Dropdown, Button } from 'semantic-ui-react'
import PlaylistDropdown from './playlist-dropdown'
import SpotifyVoteCycle from './spotify-votecycle'
import { getPlaylistsFromSpotify, selectPlaylist } from '../store/spotify-playlists'
import { getTracksFromSpotify, playTrack } from '../store/spotify-tracks'
import {getActiveVotecycleServer, createVotechoiceServer, createActiveVotecycleServer, getVotesServer, deactivateVotecycleServer} from '../store/votecycle'
import { getPlayerStatusThunk } from '../store/spotify-player'


export class SpotifyModule extends Component {

  constructor(props) {
    super(props)
    if (this.props.user.spotifyAccessToken) {
      this.props.getPlaylists()
        .then(() => {
          this.timer = setInterval(this.tick, 2000)
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
      return this.createNewVotecycle()
    } else {
      await this.props.getVotes(this.props.votecycle)
      await this.props.getPlayerStatus()
      if (!this.props.playerStatus.isPlaying && !this.props.playerStatus.progress) {
        let newTrack = this.getWinner()
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
    return this.createNewVotecycle()
  }

  handlePlay = async () => {
    const tracks = Object.values(this.props.tracks)
    const randomTrackIndex = Math.floor(Math.random() * tracks.length)
    const trackToPlay = tracks[randomTrackIndex]
    await this.props.playTrack(trackToPlay)
  }

  createNewVotecycle = async () => {
    await this.props.createActiveVotecycle(this.props.user.id)
    let choiceArr = []
    const tracks = Object.values(this.props.tracks)
    let myTrack, trackInd
    for (let i = 0; i < this.props.numChoices; i++) {
      // TODO: logic to only add unique tracks to votechoices once numChoices / playlist length stuff is done
      trackInd = Math.floor(Math.random() * tracks.length)
      myTrack = tracks[trackInd]
      choiceArr.push(this.props.createVotechoice(this.props.votecycle.id, i + 1, myTrack) )
    }
    return Promise.all(choiceArr)
  }

  getWinner = () => {
    let newTrack
    let maxVotes = 0
    this.props.votecycle.votechoices.forEach(votechoice => {
      if (votechoice.votes >= maxVotes) {
        newTrack = votechoice.track
        maxVotes = votechoice.votes
      }
    })
    return newTrack
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
        <Card style={{ width: '750px' }}>
           <PlaylistDropdown
            trackData = {trackData}
            handleChange = {this.handleChange}
            handlePlay = {this.handlePlay}
          />
          {
            (this.props.votecycle && this.props.votecycle.id && this.props.votecycle.active && this.props.currentlyPlaying())
              ? <SpotifyVoteCycle votecycle={this.props.votecycle} />
              : <div />
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyModule)
