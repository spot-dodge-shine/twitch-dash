'use strict'

import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import {
  GET_PLAYLISTS,
  SELECT_PLAYLIST,
  gotPlaylists,
  selectPlaylist,
  getPlaylistsFromSpotify,
  playlistsReducer,
  selectedPlaylistReducer
} from './spotify-playlists'

const mockStore = configureMockStore([thunkMiddleware])

const initialState = {
  playlists: {},
  selectedPlaylist: ''
}

const fakePlaylists = {
  "37i9dQZEVXcRaXzPPexjkm": {
    name: "Discover Weekly",
    id: "37i9dQZEVXcRaXzPPexjkm",
    image: "https://i.scdn.co/image/11258b6c69204820d79575e0587f415735db2350",
    externalUrl: "https://open.spotify.com/user/spotify/playlist/37i9dQZEVXcRaXzPPexjkm",
    uri: "spotify:user:spotify:playlist:37i9dQZEVXcRaXzPPexjkm",
    trackCount: 30
    },
  "6eUlMffZ4V1NQIRiPCgHyE": {
    name: "A Little More Groove",
    id: "6eUlMffZ4V1NQIRiPCgHyE",
    image: "https://mosaic.scdn.co/640/23a33ed3d3d79f009e6022e90bf6903261ecd2af3d010bb1897531711189c265bfed1c5a6d7185b499bb223a9809b48b1d62b62eeb3d42e234a7250caf83984a8017d9f49dc78361a06f71c291c68ddb",
    externalUrl: "https://open.spotify.com/user/guonads/playlist/6eUlMffZ4V1NQIRiPCgHyE",
    uri: "spotify:user:guonads:playlist:6eUlMffZ4V1NQIRiPCgHyE",
    trackCount: 107
    },
  "5cilnGkPPJRAohJj41zUyu": {
    name: "Liked from Radio",
    id: "5cilnGkPPJRAohJj41zUyu",
    image: "https://mosaic.scdn.co/640/5141fd16470be08eba1da3ab85c74f124b27a0da839be1217cf9ce1d7f0bdde8f91c1750c9d9f2bfce0fc50281a2917296bf1d8146157c1612a957eed7d0880761d81fe6a9cc8e203fc64f69fa96d1ea",
    externalUrl: "https://open.spotify.com/user/guonads/playlist/5cilnGkPPJRAohJj41zUyu",
    uri: "spotify:user:guonads:playlist:5cilnGkPPJRAohJj41zUyu",
    trackCount: 376
  }
}

describe('Playlist actions', () => {
  describe('gotPlaylists', () => {
    it('should create an action with all retrieved playlists', () => {
      const expectedAction = {
        type: GET_PLAYLISTS,
        playlists: fakePlaylists
      }
      expect(gotPlaylists(fakePlaylists)).to.be.deep.equal(expectedAction)
    })
  })

  describe('selectPlaylist', () => {
    it('should create an action to select a playlist', () => {
      const expectedAction = {
        type: SELECT_PLAYLIST,
        selectedPlaylistId: "37i9dQZEVXcRaXzPPexjkm"
      }
      expect(selectPlaylist("37i9dQZEVXcRaXzPPexjkm")).to.be.deep.equal(expectedAction)
    })
  })
})

describe('Playlist thunk creators', () => {
  let store
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getPlaylistsFromSpotify', () => {
    beforeEach(() => {
      mockAxios.onGet('/api/users/me/playlists')
        .replyOnce(200, fakePlaylists)
    })
    it('dispatches the GET_PLAYLISTS action with a playlists object', () => {
      return store.dispatch(getPlaylistsFromSpotify())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal(GET_PLAYLISTS)
          expect(actions[0].playlists).to.be.deep.equal(fakePlaylists)
        })
    })
  })
})

describe('Playlist reducers', () => {
  describe('playlistsReducer', () => {
    it('should return the initial state', () => {
      expect(playlistsReducer({}, 'not-a-valid-action')).to.deep.equal({})
    })
    it('should handle GET_PLAYLISTS', () => {
      const getPlaylistsAction = {
        type: GET_PLAYLISTS,
        playlists: fakePlaylists
      }
      expect(playlistsReducer({}, getPlaylistsAction)).to.deep.equal(fakePlaylists)
    })
  })

  describe('selectedPlaylistReducer', () => {
    it('should return the initial state', () => {
      expect(selectedPlaylistReducer('', 'not-a-valid-action')).to.deep.equal('')
    })
    it('should handle SELECT_PLAYLIST', () => {
      const selectPlaylistAction = {
        type: SELECT_PLAYLIST,
        selectedPlaylistId: "37i9dQZEVXcRaXzPPexjkm"
      }
      expect(selectedPlaylistReducer('', selectPlaylistAction)).to.deep.equal("37i9dQZEVXcRaXzPPexjkm")
    })
  })
})
