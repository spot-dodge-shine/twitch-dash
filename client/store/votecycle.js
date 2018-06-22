import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ACTIVE_VOTECYCLE = 'GET_ACTIVE_VOTECYCLE'
const CREATE_ACTIVE_VOTECYCLE = 'CREATE_ACTIVE_VOTECYCLE'
const CREATE_VOTECHOICE = 'CREATE_VOTECHOICE'

/**
 * ACTION CREATORS
 */
const getActiveVotecycle = votecycle => ({type: GET_ACTIVE_VOTECYCLE, votecycle})
const createActiveVotecycle = votecycle => ({type: CREATE_ACTIVE_VOTECYCLE, votecycle})
const createVotechoice = votechoice => ({type: CREATE_VOTECHOICE, votechoice})

/**
 * THUNK CREATORS
 */
export const getActiveVotecycleServer = (userId) => {
  return async (dispatch) => {
    const {data} = await axios.get(`/api/votecycles/active/${userId}`)
    dispatch(getActiveVotecycle(data))
  }
}

export const createActiveVotecycleServer = (userId) => {
  return async (dispatch) => {
    const {data} = await axios.post(`/api/votecycles`, {userId: userId})
    dispatch(createActiveVotecycle(data))
  }
}

export const createVotechoiceServer = (votecycleId) => {
  return async (dispatch) => {
    const {data} = await axios.post('/api/votechoices', {
      votecycleId: votecycleId
    })
    dispatch(createVotechoice(data))
  }
}

/**
 * Reducers
 */

const defaultVotecycle = {
  votechoices: []
}

export const votecycleReducer =  function(state = defaultVotecycle, action) {
  switch(action.type) {
    case GET_ACTIVE_VOTECYCLE:
      return action.votecycle
    case CREATE_ACTIVE_VOTECYCLE:
      return action.votecycle
    case CREATE_VOTECHOICE:
      return {...state, votechoices: [...state.votechoices, action.votechoice]}
    default:
      return state
  }
}