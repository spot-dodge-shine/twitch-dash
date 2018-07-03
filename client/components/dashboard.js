import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Grid, Card } from 'semantic-ui-react'
import { allModules } from '../allModules'
import DashModule from './dash-module'
import {getModulesServer, toggleModuleServer} from '../store'
import PayPalModule from './paypal/paypal-module'


class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.props.getModules()
  }

  render () {
    const { active } = this.props.modules

    return (
      <div>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            {
              active.indexOf(1) > -1
                ? <DashModule module={allModules[1]} />
                : <Card style={{ width: '425px', visibility: 'hidden' }} />
            }
          </Grid.Column>
          <Grid.Column>
            {
              active.indexOf(2) > -1
                ? <DashModule module={allModules[2]} />
                : <Card style={{ width: '425px', visibility: 'hidden' }} />
            }
          </Grid.Column>
          <Grid.Column>
            {
              active.indexOf(3) > -1
                ? <DashModule module={allModules[3]} />
                : <Card style={{ width: '425px', visibility: 'hidden' }} />
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
        {
          active.indexOf(4) > -1
            ? <DashModule module={allModules[4]} />
            : null
        }
        {/* <PayPalModule /> */}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    modules: state.modules
  }
}

const mapDispatch = (dispatch) => {
  return {
    getModules: () => dispatch(getModulesServer()),
    toggleModule: (moduleId) => dispatch(toggleModuleServer(moduleId))
  }
}

export default connect(mapState, mapDispatch)(Dashboard)

