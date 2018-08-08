import axios from 'axios'
import history from '../history'

const GET_MODULES = 'GET_MODULES'
const TOGGLE_MODULE = 'TOGGLE_MODULE'

const getModules = modules => ({type: GET_MODULES, modules})
const toggleModule = modules => ({type: TOGGLE_MODULE, modules})

export const getModulesServer = () => {
  return async (dispatch) => {
    const {data} = await axios.get('/api/users/me/modules')
    dispatch(getModules(data))
  }
}

export const toggleModuleServer = (moduleId) => {
  return async (dispatch) => {
    let numberModuleId = Number(moduleId)
    let res = await axios.get('/api/users/me/modules')
    const myModules = res.data
    let changedRes
    if (myModules.active.includes(numberModuleId) || myModules.deactivated.includes(numberModuleId)) {
      changedRes = await axios.put('/api/users/me/modules', { moduleId: numberModuleId })
    } else {
      changedRes = await axios.post('/api/users/me/modules', { moduleId: numberModuleId })
    }
    console.log('changedRes.data', changedRes.data)
    dispatch(toggleModule(changedRes.data))
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
