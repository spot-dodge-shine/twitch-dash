'use strict'

import axios from 'axios'

export const GET_TRACKS = 'GET_TRACKS'
export const PLAY_TRACK = 'PLAY_TRACK'

export const gotTracks = tracks => {
  return {
    type: GET_TRACKS,
    tracks
  }
}

export const playingTrack = currentlyPlayingId => {
  return {
    type: PLAY_TRACK,
    currentlyPlayingId
  }
}

export const getTracksFromSpotify = playlist => {
  return async dispatch => {
    const { trackCount } = playlist
    let offset = 0
    let tracks = {}
    while (offset < trackCount) {
      const { data } = await axios.get(`/api/users/me/playlists/${playlist.id}/tracks/${offset}`)
      const newTracksObj = { ...tracks, ...data }
      tracks = newTracksObj
      offset = offset + 100
    }
    dispatch(gotTracks(tracks))
  }
}

export const playTrack = track => {
  return async dispatch => {
    await axios.put(`/api/users/me/playtrack/${track.uri}`, {})
    dispatch(playingTrack(track.id))
  }
}

export const tracksReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TRACKS:
      return action.tracks
    default:
      return state
  }
}

export const currentlyPlayingReducer = (state = '', action) => {
  switch (action.type) {
    case PLAY_TRACK:
      return action.currentlyPlayingId
    default:
      return state
  }
}
