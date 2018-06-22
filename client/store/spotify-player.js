'use strict'

import axios from 'axios'

export const GET_PLAYER_INFO = 'GET_PLAYER_INFO'

export const gotPlayerInfo = playerInfo => {
  return {
    type: GET_PLAYER_INFO,
    playerInfo
  }
}

export const getPlayerInfo = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/users/me/player')
    dispatch(gotPlayerInfo(data))
  }
}

export const playerInfoReducer = (state = '', action) => {
  switch (action.type) {
    case GET_PLAYER_INFO:
      return action.playerInfo
    default:
      return state
  }
}
