import React from 'react'
import { Grid } from 'semantic-ui-react'

const DashModule = (props) => {
  const Module = props.module
  return (
  <Grid columns={1}>
    <Grid.Column>
      <Grid.Row>
        <Module />
      </Grid.Row>
    </Grid.Column>
  </Grid>
  )
}

export default DashModule
