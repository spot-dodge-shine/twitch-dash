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
  playTrack,
  getTracksFromSpotify,
  tracksReducer,
  currentlyPlayingReducer
} from './spotify-tracks'

const mockStore = configureMockStore([thunkMiddleware])

const initialState = {
  tracks: {},
  currentlyPlayingId: ''
}

