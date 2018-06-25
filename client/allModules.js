import SpotifyModule from './components/spotify-module'
import SpotifyOverlay from './components/spotify-overlay'


const allModules = {}

function registerModule (id, moduleSpec) {
  allModules[id] = moduleSpec;
}

// TODO: get all modules and load them into allModules

registerModule(1, {name: 'Spotify', dashboardComponent: SpotifyModule, overlayComponent: SpotifyOverlay })


export { allModules, registerModule }

