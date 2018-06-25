import React from 'react'

const DashModule = (props) => {
  const Component = props.module
  console.log('props: ', props)
  console.log(Component)
  return <Component />
}

export default DashModule
