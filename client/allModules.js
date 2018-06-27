import SpotifyDashboard from './components/spotify-dashboard'
import SpotifyOverlay from './components/spotify-overlay'
import axios from 'axios'


const allModules = {}

function registerModule (id, moduleSpec) {
  allModules[id] = moduleSpec;
}

// Hard-code registerModules here:
registerModule(1, {dashboardComponent: SpotifyDashboard, overlayComponent: SpotifyOverlay })

// TODO: get all modules and load them into allModules
axios.get('/api/modules')
  .then((res) => {
    return res.data.forEach((module) => {
      allModules[module.id].name = module.name
      allModules[module.id].description = module.description
      allModules[module.id].image = module.image
    })
  })

export { allModules, registerModule }

