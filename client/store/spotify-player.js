'use strict'

import axios from 'axios'

export const GET_PLAYER_STATUS = 'GET_PLAYER_STATUS'

export const gotPlayerStatus = playerStatus => {
  return {
    type: GET_PLAYER_STATUS,
    playerStatus
  }
}

export const getPlayerStatusThunk = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/users/me/player')
    dispatch(gotPlayerStatus(data))
  }
}

export const playerStatusReducer = (state = '', action) => {
  switch (action.type) {
    case GET_PLAYER_STATUS:
      return action.playerStatus
    default:
      return state
  }
}
