import React from 'react'
import {allModules} from '../allModules'

const OverlayModule = (props) => {
  const Module = allModules[props.match.params.moduleId].overlayComponent
  return <Module userId={props.match.params.userId}/>
}

export default OverlayModule
