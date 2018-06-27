import axios from 'axios'
import history from '../history'

const GET_MODULES = 'GET_MODULES'
const TOGGLE_MODULE = 'TOGGLE_MODULE'

const getModules = activeModules => ({type: GET_MODULES, modules})
const toggleModule = toggleModule => ({type: TOGGLE_MODULE, modules})

export const getModulesServer = (dispatch) => {
  return async () => {
    const {data} = await axios.get('/api/users/me/modules')
    dispatch(getModules(data))
  }
}

// export const toggleModuleServer = (dispatch) => {
//   return async (moduleId) => {
//     const {data} = await axios.('/api/users/me/modules')
//   }
// }

const defaultState = {
  active: [],
  deactivated: []
}

export function modulesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_MODULES:
      return action.modules
    default:
      return state
  }
}