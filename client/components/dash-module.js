import React from 'react'

const DashModule = (props) => {
  const Module = props.module.dashboardComponent
  const { moduleId } = props.module
  return (
    <Module moduleId={moduleId} />
  )
}

export default DashModule
