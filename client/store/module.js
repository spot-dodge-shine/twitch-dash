import axios from 'axios'
import history from '../history'

const GET_ACTIVE_MODULES = 'GET_ACTIVE_MODULES'
const TOGGLE_MODULE = 'TOGGLE_MODULE'

const getActiveModules = activeModules => ({type: GET_ACTIVE_MODULES, activeModules})
const toggleModule = toggleModule => ({type: TOGGLE_MODULE, activeModules})

export const getActiveModulesServer = (dispatch) => {
  return async () => {
    const {data} = await axios.get('/api/users/me/modules')
    dispatch(getActiveModules(data))
  }
}

// export const toggleModuleServer = (dispatch) => {
//   return async (moduleId) => {
//     const {data} = await axios.('/api/users/me/modules')
//   }
// }

const defaultState = {}

export function activeModulesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ACTIVE_MODULES:
      return action.activeModules
    default:
      return state
  }
}