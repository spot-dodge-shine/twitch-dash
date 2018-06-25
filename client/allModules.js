import SpotifyModule from './components/spotify-module'
import SpotifyVotecycle from './components/spotify-votecycle'


const allModules = {}

function registerModule (id, moduleSpec) {
  allModules[id] = moduleSpec;
}

registerModule(1, {name: 'Spotify', dashboardComponent:SpotifyModule, overlayComponent:SpotifyVotecycle})


export { allModules, registerModule }

