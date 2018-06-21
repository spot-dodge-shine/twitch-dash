'use strict'

import axios from 'axios'

export const GET_PLAYLISTS = 'GET_PLAYLISTS'
export const SELECT_PLAYLIST = 'SELECT_PLAYLIST'

export const gotPlaylists = playlists => {
  return {
    type: GET_PLAYLISTS,
    playlists
  }
}

export const selectPlaylist = selectedPlaylist => {
  return {
    type: SELECT_PLAYLIST,
    selectedPlaylist
  }
}

export const getPlaylistsFromSpotify = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/users/me/playlists')
    dispatch(gotPlaylists(data))
  }
}

export const playlistsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PLAYLISTS:
      return action.playlists
    default:
      return state
  }
}

export const selectedPlaylistReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_PLAYLIST:
      return action.selectedPlaylist
    default:
      return state
  }
}

