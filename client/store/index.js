import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import { votecycleReducer } from './votecycle'


import { playlistsReducer, selectedPlaylistReducer } from './spotify-playlists'

const reducer = combineReducers({
  user: user,
  playlists: playlistsReducer,
  selectedPlaylistId: selectedPlaylistReducer,
  votecycle: votecycleReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './votecycle'
