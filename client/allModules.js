import SpotifyModule from './components/spotify-module'
import SpotifyOverlay from './components/spotify-overlay'
import axios from 'axios'


const allModules = {}

function registerModule (id, moduleSpec) {
  allModules[id] = moduleSpec;
}

const getModules = async () => {
  const modules = axios.get('/api/modules')
}


registerModule(1, {dashboardComponent: SpotifyModule, overlayComponent: SpotifyOverlay })

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

