import SpotifyDashboard from './components/spotify-dashboard'
import SpotifyOverlay from './components/spotify-overlay'
<<<<<<< HEAD
import WhiteboardDashboard from './components/whiteboard/whiteboard-dashboard'
import WhiteboardOverlay from './components/whiteboard/whiteboard-overlay'
=======
import PayPalDashboard from './components/paypal-billboard/paypal-dashboard'

>>>>>>> 26a917d7f2fbddb76450b91563b804320bf9ee8b
import axios from 'axios'


const allModules = {}

function registerModule (id, moduleSpec) {
  allModules[id] = moduleSpec;
}

// Hard-code registerModules here:
registerModule(1, {dashboardComponent: SpotifyDashboard, overlayComponent: SpotifyOverlay })
<<<<<<< HEAD
registerModule(3, {dashboardComponent: WhiteboardDashboard, overlayComponent: WhiteboardOverlay })

=======
registerModule(2, {dashboardComponent: PayPalDashboard, overlayComponent: SpotifyOverlay })
>>>>>>> 26a917d7f2fbddb76450b91563b804320bf9ee8b

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

