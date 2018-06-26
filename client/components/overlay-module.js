import React from 'react'
import {allModules} from '../allModules'

const OverlayModule = (props) => {
  const Component = allModules[props.match.params.moduleId].overlayComponent
  return <Component userId={props.match.params.userId}/>
}

export default OverlayModule
