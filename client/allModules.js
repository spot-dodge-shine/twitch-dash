import SpotifyModule from './components/spotify-module'
import SpotifyVotecycle from './components/spotify-votecycle'


const allModules = {}

function registerModule (name, moduleSpec) {
  allModules[name] = moduleSpec;
}

registerModule('Spotify', {dashboardComponent:SpotifyModule, overlayComponent:SpotifyVotecycle, active: true})


export { allModules, registerModule }

