import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ACTIVE_VOTECYCLE = 'GET_ACTIVE_VOTECYCLE'
const CREATE_ACTIVE_VOTECYCLE = 'CREATE_ACTIVE_VOTECYCLE'
const CREATE_VOTECHOICE = 'CREATE_VOTECHOICE'
const GET_VOTES = 'GET_VOTES'

/**
 * ACTION CREATORS
 */
const getActiveVotecycle = votecycle => ({type: GET_ACTIVE_VOTECYCLE, votecycle})
const createActiveVotecycle = votecycle => ({type: CREATE_ACTIVE_VOTECYCLE, votecycle})
const createVotechoice = votechoice => ({type: CREATE_VOTECHOICE, votechoice})
const getVotes = votechoices => ({type: GET_VOTES, votechoices})

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

export const getVotesServer = (votecycle) => {
  return async (dispatch) => {
    console.log('votecycle.id', votecycle.id)
    const {data} = await axios.get(`/api/votecycles/${votecycle.id}/votes`)
    const newVotechoices = votecycle.votechoices.map(votechoice => {
      return {...votechoice, votes: data[votechoice.id]}
    })
    dispatch(getVotes(newVotechoices))
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
    case GET_VOTES:
      return {...state, votechoices: action.votechoices}
    default:
      return state
  }
}