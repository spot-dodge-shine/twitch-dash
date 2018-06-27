import axios from 'axios'
import history from '../history'

const GET_MODULES = 'GET_MODULES'
const TOGGLE_MODULE = 'TOGGLE_MODULE'

const getModules = activeModules => ({type: GET_MODULES, modules})
const toggleModule = modules => ({type: TOGGLE_MODULE, modules})

export const getModulesServer = (dispatch) => {
  return async () => {
    const {data} = await axios.get('/api/users/me/modules')
    dispatch(getModules(data))
  }
}

export const toggleModuleServer = (dispatch) => {
  return async (moduleId) => {
    let res = await axios.get('/api/users/me/modules')
    const myModules = res.data
    let changedRes
    if (myModules.active.includes(moduleId) || myModules.deactivated.includes(moduleId)) {
      changedRes = await axios.put('/api/users/me/modules', { moduleId }) 
    } else {
      changedRes = await axios.post('/api/users/me/modules', { moduleId })
    }
    dispatch(toggleModule, changedRes.data)
  }
}

const defaultState = {
  active: [],
  deactivated: []
}

export function modulesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_MODULES:
      return action.modules
    case TOGGLE_MODULE:
      return action.modules
    default:
      return state
  }
}