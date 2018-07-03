import React from 'react'

const DashModule = (props) => {
  const Module = props.module.dashboardComponent
  const { moduleId } = props.module
  return (
    <div className='module-container'>
      <Module moduleId={moduleId} />
    </div>
  )
}

export default DashModule
