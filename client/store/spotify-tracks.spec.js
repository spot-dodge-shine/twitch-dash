'use strict'

import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import {
  GET_TRACKS,
  PLAY_TRACK,
  gotTracks,
  playingTrack,
  getTracksFromSpotify,
  playTrack,
  tracksReducer,
  currentlyPlayingReducer
} from './spotify-tracks'

const mockStore = configureMockStore([thunkMiddleware])

const initialState = {
  tracks: {},
  currentlyPlayingId: ''
}

const fakeTracks = {
  "76xNAVwiQccBXImICK5zUP": {
    "name": "To My Soul",
    "artist": "Jerry Folk",
    "image": "https://i.scdn.co/image/b23eafdbe6d6b8cbce146f61e11e2e450097d7df",
    "id": "76xNAVwiQccBXImICK5zUP",
    "uri": "spotify:track:76xNAVwiQccBXImICK5zUP"
  },
  "51Vf6hJbVnvsTjsvOHoZ3A": {
    "name": "By My Side",
    "artist": "Great Good Fine Ok",
    "image": "https://i.scdn.co/image/95250289af2e0848e8392226937b234936d17cff",
    "id": "51Vf6hJbVnvsTjsvOHoZ3A",
    "uri": "spotify:track:51Vf6hJbVnvsTjsvOHoZ3A"
  },
  "31ZdIGyNncuufUjNTp5ZY3": {
    "name": "Generationwhy",
    "artist": "ZHU",
    "image": "https://i.scdn.co/image/01e08194d9fd549f920f23ff98f0bfd492c8c7d9",
    "id": "31ZdIGyNncuufUjNTp5ZY3",
    "uri": "spotify:track:31ZdIGyNncuufUjNTp5ZY3"
  },
  "5pvJqNwUUahJIZ9a8CFeiP": {
    "name": "Eagle Eyes - Lucas & Steve Remix Edit",
    "artist": "Felix Jaehn",
    "image": "https://i.scdn.co/image/ebd3adec32a0e6d97523709947e817228cdca60c",
    "id": "5pvJqNwUUahJIZ9a8CFeiP",
    "uri": "spotify:track:5pvJqNwUUahJIZ9a8CFeiP"
  },
  "4K8XcIz6J1VoZQaJ0xQiOT": {
    "name": "I Want You so Bad",
    "artist": "Glades",
    "image": "https://i.scdn.co/image/7daf09d8cead8d3295d962734fa7a5e3b1fad627",
    "id": "4K8XcIz6J1VoZQaJ0xQiOT",
    "uri": "spotify:track:4K8XcIz6J1VoZQaJ0xQiOT"
  }
}

const fakePlaylist = {
  name: "Discover Weekly",
  id: "37i9dQZEVXcRaXzPPexjkm",
  image: "https://i.scdn.co/image/11258b6c69204820d79575e0587f415735db2350",
  externalUrl: "https://open.spotify.com/user/spotify/playlist/37i9dQZEVXcRaXzPPexjkm",
  uri: "spotify:user:spotify:playlist:37i9dQZEVXcRaXzPPexjkm",
  trackCount: 30
}

describe('Track actions', () => {
  describe('gotTracks', () => {
    it('should create an action with all retrieved tracks', () => {
      const expectedAction = {
        type: GET_TRACKS,
        tracks: fakeTracks
      }
      expect(gotTracks(fakeTracks)).to.be.deep.equal(expectedAction)
    })
  })

  describe('playingTrack', () => {
    it('should create an action with the id of the currently playing track', () => {
      const expectedAction = {
        type: PLAY_TRACK,
        currentlyPlayingId: '76xNAVwiQccBXImICK5zUP'
      }
      expect(playingTrack('76xNAVwiQccBXImICK5zUP')).to.be.deep.equal(expectedAction)
    })
  })
})

describe('Track thunk creators', () => {
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

  describe('getTracksFromSpotify', () => {
    beforeEach(() => {
      mockAxios.onGet(`/api/users/me/playlists/37i9dQZEVXcRaXzPPexjkm/tracks/0`)
        .replyOnce(200, fakeTracks)
    })

    it('dispatches the GET_TRACKS action with a tracks object', () => {
      return store.dispatch(getTracksFromSpotify(fakePlaylist))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal(GET_TRACKS)
          expect(actions[0].tracks).to.be.deep.equal(fakeTracks)
        })
    })
  })

  describe('playTrack', () => {
    beforeEach(() => {
      mockAxios.onPut(`/api/users/me/playtrack/spotify:track:76xNAVwiQccBXImICK5zUP`, {})
        .replyOnce(200, fakeTracks['76xNAVwiQccBXImICK5zUP'])
    })

    it('dispatches the PLAY_TRACK action with the id of the currently playing track', () => {
      return store.dispatch(playTrack(fakeTracks['76xNAVwiQccBXImICK5zUP']))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal(PLAY_TRACK)
          expect(actions[0].currentlyPlayingId).to.be.equal('76xNAVwiQccBXImICK5zUP')
        })
    })
  })
})

describe('Track reducers', () => {
  describe('tracksReducer', () => {
    it('should return the initial state', () => {
      expect(tracksReducer({}, 'not-a-valid-action')).to.deep.equal({})
    })

    it('should handle GET_TRACKS', () => {
      const getTracksAction = {
        type: GET_TRACKS,
        tracks: fakeTracks
      }
      expect(tracksReducer({}, getTracksAction)).to.deep.equal(fakeTracks)
    })
  })

  describe('currentlyPlayingReducer', () => {
    it('should return the initial state', () => {
      expect(currentlyPlayingReducer('', 'not-a-valid-action')).to.deep.equal('')
    })

    it('should handle GET_TRACKS', () => {
      const playTrackAction = {
        type: PLAY_TRACK,
        currentlyPlayingId: '76xNAVwiQccBXImICK5zUP'
      }
      expect(currentlyPlayingReducer('', playTrackAction)).to.equal('76xNAVwiQccBXImICK5zUP')
    })
  })
})


