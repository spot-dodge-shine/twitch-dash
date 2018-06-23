'use strict'

import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import {
  GET_PLAYER_STATUS,
  gotPlayerStatus,
  getPlayerStatusThunk,
  playerStatusReducer
} from './spotify-player'

const mockStore = configureMockStore([thunkMiddleware])

const initialState = {}

const fakePlayerStatus = {
  isPlaying: true,
  progress: 420133769
}

describe('gotPlayerStatus', () => {
  it('should create an action with the player status', () => {
    const expectedAction = {
      type: GET_PLAYER_STATUS,
      playerStatus: fakePlayerStatus
    }
    expect(gotPlayerStatus(fakePlayerStatus)).to.be.deep.equal(expectedAction)
  })
})

describe('Player thunk creators', () => {
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

  describe('getPlayerStatusThunk', () => {
    beforeEach(() => {
      mockAxios.onGet('/api/users/me/player')
        .replyOnce(200, fakePlayerStatus)
    })
    it('dispatches the GET_PLAYER_STATUS action', () => {
      return store.dispatch(getPlayerStatusThunk())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal(GET_PLAYER_STATUS)
          expect(actions[0].playerStatus).to.be.deep.equal(fakePlayerStatus)
        })
    })
  })
})

describe('playerStatusReducer', () => {
  it('should return the initial state', () => {
    expect(playerStatusReducer('', 'not-a-valid-action')).to.deep.equal('')
  })
  it('should handle GET_PLAYER_STATUS', () => {
    const selectPlaylistAction = {
      type: GET_PLAYER_STATUS,
      playerStatus: fakePlayerStatus
    }
    expect(playerStatusReducer('', selectPlaylistAction)).to.deep.equal(fakePlayerStatus)
  })
})

