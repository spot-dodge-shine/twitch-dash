import SpotifyDashboard from './components/spotify-dashboard'
import SpotifyOverlay from './components/spotify-overlay'
import PayPalDashboard from './components/paypal-billboard/paypal-dashboard'
import WhiteboardDashboard from './components/whiteboard/whiteboard-dashboard'
import WhiteboardOverlay from './components/whiteboard/whiteboard-overlay'
import axios from 'axios'

const allModules = {}

function registerModule (id, moduleSpec) {
  allModules[id] = moduleSpec;
}

// Hard-code registerModules here:
registerModule(1, { moduleId: 1,
  dashboardComponent: SpotifyDashboard, overlayComponent: SpotifyOverlay })
registerModule(2, { moduleId: 2,
  dashboardComponent: PayPalDashboard, overlayComponent: SpotifyOverlay })
registerModule(3, { moduleId: 3,
  dashboardComponent: WhiteboardDashboard, overlayComponent: WhiteboardOverlay })

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

