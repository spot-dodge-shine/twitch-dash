import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ACTIVE_VOTECYCLE = 'GET_ACTIVE_VOTECYCLE'
const CREATE_ACTIVE_VOTECYCLE = 'CREATE_ACTIVE_VOTECYCLE'
const CREATE_VOTECHOICE = 'CREATE_VOTECHOICE'
const GET_VOTES = 'GET_VOTES'
const DEACTIVATE_VOTECYCLE = 'DEACTIVATE_VOTECYCLE'

/**
 * ACTION CREATORS
 */
const getActiveVotecycle = votecycle => ({type: GET_ACTIVE_VOTECYCLE, votecycle})
const createActiveVotecycle = votecycle => ({type: CREATE_ACTIVE_VOTECYCLE, votecycle})
const createVotechoice = votechoice => ({type: CREATE_VOTECHOICE, votechoice})
const getVotes = votechoices => ({type: GET_VOTES, votechoices})
const deactivateVotecycle = (votecycle) => ({type: DEACTIVATE_VOTECYCLE, votecycle})

/**
 * THUNK CREATORS
 */
export const getActiveVotecycleServer = (userId) => {
  return async (dispatch) => {
    const {data} = await axios.get(`/api/votecycles/active/${userId}`)
    if (data) {
      let promiseArr = []
      data.votechoices.forEach((votechoice) => {
        promiseArr.push(axios.get(`/api/votechoices/${votechoice.trackId}/${userId}`))
      })
      const trackArr = await Promise.all(promiseArr)
      for (var i = 0; i < data.votechoices.length; i++) {
        data.votechoices[i].track = trackArr[i].data
      }
      // TODO: SUPER JANKY -> change to model method later
      const myRes = await axios.get(`/api/votecycles/${data.id}/votes`)
      data.votechoices = data.votechoices.map(votechoice => {
        return {...votechoice, votes: myRes.data[votechoice.id]}
      })
    }
    dispatch(getActiveVotecycle(data))
  }
}

export const createActiveVotecycleServer = (userId, playlistId) => {
  return async (dispatch) => {
    const {data} = await axios.post(`/api/votecycles`, {userId: userId, playlistId})
    dispatch(createActiveVotecycle(data))
  }
}

export const createVotechoiceServer = (votecycleId, votecycleEnumId, track) => {
  return async (dispatch) => {
    const {data} = await axios.post('/api/votechoices', {
      votecycleId: votecycleId,
      votecycleEnumId: votecycleEnumId,
      trackId: track.id
    })
    data.track = track
    dispatch(createVotechoice(data))
  }
}

export const getVotesServer = (votecycle) => {
  return async (dispatch) => {
    const {data} = await axios.get(`/api/votecycles/${votecycle.id}/votes`)
    const newVotechoices = votecycle.votechoices.map(votechoice => {
      return {...votechoice, votes: data[votechoice.id]}
    })
    dispatch(getVotes(newVotechoices))
  }
}

export const deactivateVotecycleServer = (votecycleId) => {
  return async (dispatch) => {
    const {data} = await axios.put(`/api/votecycles/${votecycleId}`, {active: false})
    dispatch(deactivateVotecycle(data))
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
    case DEACTIVATE_VOTECYCLE:
      return action.votecycle
    default:
      return state
  }
}
