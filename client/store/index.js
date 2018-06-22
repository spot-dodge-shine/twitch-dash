import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import { playlistsReducer, selectedPlaylistReducer } from './spotify-playlists'
import { playerStatusReducer } from './spotify-player'
import { tracksReducer, currentlyPlayingReducer } from './spotify-tracks'
import { votecycleReducer } from './votecycle'

const reducer = combineReducers({
  user: user,
  playlists: playlistsReducer,
  playerStatus: playerStatusReducer,
  selectedPlaylistId: selectedPlaylistReducer,
  tracks: tracksReducer,
  currentlyPlayingId: currentlyPlayingReducer,
  votecycle: votecycleReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './votecycle'
export * from './spotify-player'
export * from './spotify-playlists'
