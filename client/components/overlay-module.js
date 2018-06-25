import React from 'react'
import {allModules} from '../allModules'

const OverlayModule = (props) => {
  const Component = allModules[props.params.match.moduleName].overlayComponent
  return <Component />
}

export default OverlayModule
