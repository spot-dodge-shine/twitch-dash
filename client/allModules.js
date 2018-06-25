const allModules = {}


function registerModule (name, moduleSpec) {
  allModules[name] = moduleSpec;
}

export default { allModules, registerModule }

