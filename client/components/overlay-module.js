import React from 'react'
import {allModules} from '../allModules'

const OverlayModule = (props) => {
  console.log('overlay modulr props: ', props)
  const Component = allModules[props.match.params.moduleId].overlayComponent
  return <Component userId={props.match.params.userId}/>
}

export default OverlayModule
